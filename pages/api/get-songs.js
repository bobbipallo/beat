import connectDB from '../../util/mongodb'
import Song from '../../models/song'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    Song.find({}, (err, doc) => {
      if (err) {
        res.status(500).send({ err })
      } else {
        res.status(200).send(doc)
      }
    })
  } else {
    res.status(422).send('req_method_not_supported')
  }
}

export default connectDB(handler)
