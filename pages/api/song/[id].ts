import { NextApiRequest, NextApiResponse } from 'next'

import client, { q } from '../../../utils/fauna'
import { Song } from '../../../types'

const { Get, Ref, Collection } = q

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const song: Song = await client.query(Get(Ref(Collection('songs'), req.query.id)))

      res.status(200).json(song)
    } catch (err) {
      res.status(err.status || 500).send('Something went wrong')
    }
  } else {
    res.status(405).send('Unsupported method')
  }
}
