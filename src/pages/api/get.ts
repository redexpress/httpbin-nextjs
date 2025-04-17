import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '') as string;
  const ipv4 = ip.replace(/^::ffff:/, '').replace(/^::1$/, '127.0.0.1');
  const protocol = (req.headers['x-forwarded-proto'] || (req.connection.encrypted ? 'https' : 'http')) as string;
  const host = req.headers['host'] as string;
  const fullUrl = `${protocol}://${host}${req.url}`;

  res.status(200).json({
    args: req.query,
    headers: req.headers,
    origin: ipv4,
    url: fullUrl,
  });
}
