// pages/api/delay/[seconds].ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { seconds } = req.query
  const delay = parseInt(seconds as string, 10) * 1000
  
  if (isNaN(delay)) {
    return res.status(400).json({ error: 'Invalid delay parameter' })
  }

  setTimeout(() => {
    res.status(200).json({
      delay: delay / 1000,
      message: `Delayed response after ${seconds} seconds`
    })
  }, Math.min(delay, 30000)) // Max delay 30 seconds
}