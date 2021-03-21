import { useState, useEffect, useRef, FunctionComponent } from 'react'
import ReactPlayer from 'react-player/youtube'

import Controls from './Controls'
import styles from './Player.module.css'
import { Song } from 'types'

const getRandomSong = async () => {
  const res = await fetch('/api/song/random')
  const song = await res.json()
  return song
}

const Player: FunctionComponent = () => {
  const [song, setSong] = useState<Song>(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const prevSong = useRef(null)

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
    prevSong.current = song
    const newSong = await getRandomSong()
    setSong(newSong)
    setPlaying(true)
  }

  const getPreviousSong = async () => {
    setSong(prevSong.current)
  }

  return (
    <>
      <div
        className={`${styles.overlay} ${!started ? styles.active : ''}`}
      ></div>
      {started && (
        <div className="fixed top-0 left-0 z-50 text-white px-4 py-4">
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
      <div className="fixed bottom-0 left-0 z-50 w-full py-6">
        <Controls
          onPlay={togglePlaying}
          onNext={getNextSong}
          onPrevious={getPreviousSong}
          playing={playing}
        />
      </div>
    </>
  )
}

export default Player
