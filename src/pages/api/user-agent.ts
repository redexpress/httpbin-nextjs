// pages/api/user-agent.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({
    'user-agent': req.headers['user-agent']
  })
}