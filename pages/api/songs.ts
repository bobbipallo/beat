import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '@/utils/mongodb'
import Song from '@/models/Song'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const songs = await Song.find()

      res.json(songs)
    } catch (err) {
      res.status(err.status || 500).send(err.message || 'Something went wrong')
    }
  } else if (req.method === 'POST') {
    try {
      const { title, author, date, genre } = req.body

      if (!title || !author || !date || !genre)
        return res.status(400).send('Pleade provide the following properties: title, author, date, genre')

      const data = {
        title,
        author,
        date,
        genre,
      }

      const song = await Song.create(data)

      res.json(song)
    } catch (err) {
      res.status(err.status || 500).send(err.message || 'Something went wrong')
    }
  } else {
    res.status(405).send('Unsupported method')
  }
}

export default connectDB(handler)
