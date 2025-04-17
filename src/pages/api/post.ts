// pages/api/post.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const rawBody = await getRawBody(req);
  const contentType = req.headers['content-type'] || '';

  let json = null;
  let form: null | Object = {};

  try {
    if (contentType.includes('application/json')) {
      json = JSON.parse(rawBody);
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      form = Object.fromEntries(new URLSearchParams(rawBody));
    }
  } catch (e) {
    // Handle parse errors silently
  }

  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '') as string;
  const rawIp = ip.split(',')[0].trim();
  const ipv4 = rawIp.replace(/^::ffff:/, '').replace(/^::1$/, '127.0.0.1');

  const protocol = (req.headers['x-forwarded-proto'] || (req.connection.encrypted ? 'https' : 'http')) as string;
  const host = req.headers['host'] as string;
  const fullUrl = `${protocol}://${host}${req.url}`;

  res.status(200).json({
    args: req.query, // Add query parameters to args
    data: rawBody,
    json,
    form,
    headers: req.headers,
    origin: ipv4,
    url: fullUrl,
  });
}

async function getRawBody(req: NextApiRequest): Promise<string> {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => resolve(data));
  });
}