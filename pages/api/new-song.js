import connectDB from '../../util/mongodb'
import Song from '../../models/song'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    // Check if name, email or password is provided
    const { title, author, date, genre } = req.body
    if (title && author && date && genre) {
      try {
        // Hash password to store it in DB
        let song = new Song({
          title,
          author,
          date,
          genre,
        })
        // Create new user
        var songCreated = await song.save()
        return res.status(200).send(songCreated)
      } catch (error) {
        return res.status(500).send(error.message)
      }
    } else {
      res.status(422).send('data_incomplete')
    }
  } else {
    res.status(422).send('req_method_not_supported')
  }
}

export default connectDB(handler)
