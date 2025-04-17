// __test__/api/headers.test.ts
import { createRequest, createResponse } from 'node-mocks-http';
import handler from '../../pages/api/headers';
import type { NextApiRequest, NextApiResponse } from 'next';

describe('GET /api/headers', () => {
  it('returns request headers', async () => {
    const req = createRequest<NextApiRequest>({
      method: 'GET',
      url: '/api/headers',
      headers: { 'x-custom': 'test' },
    });
    const res = createResponse<NextApiResponse>();

    await handler(req, res);

    const data = res._getJSONData();
    expect(data.headers['x-custom']).toBe('test');
    expect(data.headers).not.toHaveProperty('host');
  });
});