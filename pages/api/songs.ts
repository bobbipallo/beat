import { NextApiRequest, NextApiResponse } from 'next'

import client, { q } from '../../utils/fauna'
import { Song } from '../../types'

const { Map, Paginate, Documents, Collection, Lambda, Get, Var, Create } = q

type Docs = {
  data: Song[]
}

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const docs: Docs = await client.query(
        Map(Paginate(Documents(Collection('songs'))), Lambda('ref', Get(Var('ref')))),
      )

      res.status(200).json(docs.data)
    } catch (err) {
      res.status(err.status || 500).send('Something went wrong')
    }
  } else if (req.method === 'POST') {
    try {
      const { title, author } = req.body

      const data = {
        title,
        author,
      }

      const doc = await client.query(Create(Collection('songs'), { data }))

      res.status(200).json(doc)
    } catch (err) {
      res.status(err.status || 500).send('Something went wrong')
    }
  } else {
    res.status(405).send('Unsupported method')
  }
}
