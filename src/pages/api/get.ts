// pages/api/get.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  res.status(200).json({
    args: req.query,
    headers: req.headers,
    origin: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    url: req.url
  })
}