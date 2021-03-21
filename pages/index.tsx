import { FunctionComponent } from 'react'

import Player from '@/components/Player'
import Navbar from '@/components/Navbar'

const Home: FunctionComponent = () => {
  return (
    <>
      <Navbar />
      <Player />
    </>
  )
}

export default Home
