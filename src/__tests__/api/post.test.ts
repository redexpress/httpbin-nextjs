/**
 * @jest-environment node
 */

import { createResponse } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../pages/api/post';
import { Readable } from 'stream';

function buildMockRequest(
  method: string,
  body: any,
  contentType: string
): NextApiRequest {
  const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);

  const req = Object.assign(Readable.from([Buffer.from(bodyStr)]), {
    method,
    headers: {
      'content-type': contentType,
      'content-length': Buffer.byteLength(bodyStr).toString(),
    },
    socket: {
      remoteAddress: '127.0.0.1',
    },
    query: {},
  }) as unknown as NextApiRequest;

  return req;
}

describe('/api/post handler', () => {
  it('handles JSON payload', async () => {
    const payload = { key: 'value' };
    const req = buildMockRequest('POST', payload, 'application/json');
    const res = createResponse<NextApiResponse>();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    expect(data.json).toEqual(payload);
    expect(JSON.parse(data.data)).toEqual(payload); // fixed here
  });

  it('parses form data', async () => {
    const formEncoded = 'field1=val1&field2=val2';
    const req = buildMockRequest('POST', formEncoded, 'application/x-www-form-urlencoded');
    const res = createResponse<NextApiResponse>();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    expect(data.form).toEqual({
      field1: 'val1',
      field2: 'val2',
    });
  });

  it('rejects non-POST methods', async () => {
    const req = Object.assign(Readable.from([]), {
      method: 'GET',
      headers: {},
      query: {},
      socket: { remoteAddress: '127.0.0.1' },
    }) as unknown as NextApiRequest;

    const res = createResponse<NextApiResponse>();
    await handler(req, res);

    expect(res.statusCode).toBe(405);
    const data = res._getJSONData();
    expect(data).toHaveProperty('error', 'Method Not Allowed');
  });
});
