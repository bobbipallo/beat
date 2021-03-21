import { useState, useEffect, FunctionComponent } from 'react'
import ReactPlayer from 'react-player/youtube'

import Controls from './Controls'
import styles from './Player.module.css'

const getRandomSong = async () => {
  const res = await fetch('/api/song/random')
  const song = await res.json()
  return song
}

const Player: FunctionComponent = () => {
  const [song, setSong] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const getSong = async () => {
      const song = await getRandomSong()
      setSong(song)
    }
    getSong()
  }, [])

  const onStart = () => {
    setStarted(true)
  }

  const togglePlaying = () => {
    setPlaying((prev) => !prev)
  }

  const getNextSong = async () => {
    const song = await getRandomSong()
    setSong(song)
    setPlaying(true)
  }

  return (
    <>
      <div
        className={`${styles.overlay} ${!started ? styles.active : ''}`}
      ></div>
      {started && (
        <div className="fixed top-0 left-0 z-50 w-full text-white px-4 py-4">
          <h1 className="text-6xl text-white font-extrabold">{song?.title}</h1>
          <h4 className="text-2xl text-white">{song?.author}</h4>
        </div>
      )}
      {song && (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${song.youtube}?autoplay=1origin=http://localhost:3000theme=light`}
          className={styles.container}
          onStart={onStart}
          playing={playing}
          config={{
            playerVars: {
              rel: 0,
            },
          }}
        />
      )}
      <div className="fixed bottom-0 left-0 z-50 w-full py-4">
        <Controls
          onPlay={togglePlaying}
          onNext={getNextSong}
          playing={playing}
        />
      </div>
    </>
  )
}

export default Player
