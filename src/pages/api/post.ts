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

  res.status(200).json({
    args: req.query, // Add query parameters to args
    data: rawBody,
    json,
    form,
    headers: req.headers,
    origin: req.headers['x-forwarded-for'] || req.socket.remoteAddress
  });
}

async function getRawBody(req: NextApiRequest): Promise<string> {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => resolve(data));
  });
}