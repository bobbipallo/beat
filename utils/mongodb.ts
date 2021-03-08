import { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>

const connectDB = (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res)
  }
  // Use new db connection
  await mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  return handler(req, res)
}

export default connectDB
