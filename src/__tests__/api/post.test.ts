// __test__/api/post.test.ts
import { createRequest, createResponse } from 'node-mocks-http';
import handler from '../../pages/api/post';
import type { NextApiRequest, NextApiResponse } from 'next';

describe('POST /api/post', () => {
  it('handles JSON payload', async () => {
    const payload = { key: 'value' };
    const req = createRequest<NextApiRequest>({
      method: 'POST',
      url: '/api/post',
      headers: { 'content-type': 'application/json' },
      body: payload,
    });
    const res = createResponse<NextApiResponse>();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    expect(data.json).toEqual(payload);
    expect(JSON.stringify(data.data)).toBe(JSON.stringify(payload));
  });

  it('parses form data', async () => {
    const req = createRequest<NextApiRequest>({
      method: 'POST',
      url: '/api/post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'field1=val1&field2=val2',
    });
    const res = createResponse<NextApiResponse>();

    await handler(req, res);

    expect(res._getJSONData().form).toEqual({
      field1: 'val1',
      field2: 'val2',
    });
  });

  it('rejects non-POST methods', async () => {
    const req = createRequest<NextApiRequest>({ method: 'GET', url: '/api/post' });
    const res = createResponse<NextApiResponse>();
    
    await handler(req, res);
    
    expect(res.statusCode).toBe(405);
  });
});