import { FunctionComponent } from 'react'

const play = () => (
  <>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M8 5v14l11-7z" />
  </>
)

const pause = () => (
  <>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </>
)

const previous = () => (
  <>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
  </>
)

const next = () => (
  <>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
  </>
)

const icons = {
  play,
  pause,
  previous,
  next,
}

export type IconType = 'play' | 'pause' | 'previous' | 'next'

interface IconProps {
  icon: IconType
  className: string
}

const Icon: FunctionComponent<IconProps> = ({ icon, ...rest }) => {
  const Path = icons[icon]

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
      <Path />
    </svg>
  )
}

export default Icon
