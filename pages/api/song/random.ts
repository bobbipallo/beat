import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '@/utils/mongodb'
import Song from '@/models/Song'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const song = await Song.aggregate([{ $sample: { size: 1 } }])

    res.json(song)
  } else {
    res.status(405).send('Unsupported method')
  }
}

export default connectDB(handler)
