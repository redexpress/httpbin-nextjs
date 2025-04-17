import { createRequest, createResponse } from 'node-mocks-http';
import handler from '../../pages/api/status/[code]';
import type { NextApiRequest, NextApiResponse } from 'next';

function createDynamicRouteRequest(url: string, query = {}) {
  const req = createRequest<NextApiRequest>({
    method: 'GET',
    url,
    query
  })
  return req
}

describe('GET /api/status/:code', () => {
  it('returns valid status code', async () => {
    const req = createDynamicRouteRequest('/api/status/418', { code: '418' })
    const res = createResponse<NextApiResponse>()

    await handler(req, res)
    
    expect(res.statusCode).toBe(418)
  })

  it('handles invalid status codes', async () => {
    const req = createDynamicRouteRequest('/api/status/999', { code: '999' })
    const res = createResponse<NextApiResponse>()

    await handler(req, res)
    
    expect(res.statusCode).toBe(999)
  })

  // it('supports POST requests with path parameters', async () => {
  //   const req = createDynamicRouteRequest('POST', '/api/status/200', { code: '200' });
  //   const res = createResponse<NextApiResponse>();

  //   await handler(req, res);

  //   expect(res.statusCode).toBe(200);
  // });
});