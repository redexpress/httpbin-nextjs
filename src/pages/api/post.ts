// pages/api/post.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  res.status(200).json({
    data: req.body,
    headers: req.headers,
    json: req.body,
    origin: req.headers['x-forwarded-for'] || req.socket.remoteAddress
  })
}