// pages/api/status/[code].ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query
  const statusCode = parseInt(code as string, 10)
  
  if (isNaN(statusCode)) {
    return res.status(400).json({ error: 'Invalid status code' })
  }

  res.status(statusCode).json({
    code: statusCode,
    message: 'Response with specified status code'
  })
}