// pages/api/ip.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({
    origin: req.headers['x-forwarded-for'] || req.socket.remoteAddress
  })
}