// tests/api/get.test.js
import { createRequest, createResponse } from 'node-mocks-http';
import handler from '../../pages/api/get';

describe('GET /api/get', () => {
  it('should return query parameters, headers, origin, and URL', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/get?foo=bar&baz=qux',
      headers: {
        accept: 'application/json',
        'user-agent': 'TestAgent',
        'x-forwarded-for': '192.168.1.1',
      },
    });

    const res = createResponse();
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const json = res._getJSONData();

    expect(json).toHaveProperty('args', { foo: 'bar', baz: 'qux' });
    expect(json).toHaveProperty('headers');
    expect(json.headers['user-agent']).toBe('TestAgent');
    expect(json.origin).toBe('192.168.1.1');
    expect(json.url).toBe('/api/get?foo=bar&baz=qux');
  });

  it('should return 405 Method Not Allowed for non-GET requests', async () => {
    const req = createRequest({ method: 'POST', url: '/api/get' });
    const res = createResponse();
    await handler(req, res);

    expect(res.statusCode).toBe(405);
    const json = res._getJSONData();
    expect(json).toHaveProperty('error', 'Method Not Allowed');
  });
});