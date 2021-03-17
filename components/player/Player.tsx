import { useState, useEffect, FunctionComponent } from 'react'
import styles from './Player.module.css'
import ReactPlayer from 'react-player/youtube'

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

  const onPause = () => {
    console.log('paused')
  }

  const onReady = () => {
    // setPlaying(true)
    console.log('ready')
  }

  const onStart = () => {
    console.log('start')
    setStarted(true)
  }

  const togglePlaying = () => {
    console.log(song)
    setPlaying((prev) => !prev)
  }

  const getNextSong = async () => {
    const song = await getRandomSong()
    setSong(song)
    setPlaying(true)
  }

  return (
    <>
      <div className={`${styles.overlay} ${!started ? styles.active : ''}`}></div>
      <div>
        <div className="fixed top-0 left-0 z-50 w-full text-white">
          <h1 className="text-5xl text-white font-extrabold">{song?.title}</h1>
          <h4 className="text-3xl text-white">{song?.author}</h4>
        </div>
        {song && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${song.youtube}?autoplay=1origin=http://localhost:3000theme=light`}
            className={styles.container}
            onPause={onPause}
            onReady={onReady}
            onStart={onStart}
            playing={playing}
            config={{
              playerVars: {
                rel: 0,
              },
            }}
          />
        )}
        <div className="fixed bottom-1 left-0 z-50 w-full text-white">
          <button className={styles.button} onClick={togglePlaying}>
            Play
          </button>
          <button className={styles.button} onClick={getNextSong}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default Player
