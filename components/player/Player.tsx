import { useState, FunctionComponent } from 'react'
import styles from './Player.module.css'
import ReactPlayer from 'react-player/youtube'

const Player: FunctionComponent = () => {
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)

  const onPause = () => {
    console.log('paused')
  }

  const onReady = () => {
    setPlaying(true)
    console.log('ready')
  }

  const onStart = () => {
    console.log('start')
    setStarted(true)
  }

  const togglePlaying = () => {
    setPlaying((prev) => !prev)
  }

  return (
    <>
      <div className={`${styles.overlay} ${!started ? styles.active : ''}`}></div>
      <div>
        <button onClick={togglePlaying}>Play</button>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=SIucoNH8mzo?autoplay=1"
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
      </div>
    </>
  )
}

export default Player
