import faunadb from 'faunadb'

const client = new faunadb.Client({ secret: process.env.FAUNA_DB_SECRET })

export const q = faunadb.query

export default client
