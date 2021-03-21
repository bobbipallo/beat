import { FunctionComponent } from 'react'
import Icon, { IconType } from '@/components/icon'

interface ControlButtonProps {
  onClick: () => void
  icon: IconType
}

const ControlButton: FunctionComponent<ControlButtonProps> = ({
  icon,
  onClick,
}) => {
  return (
    <button
      className="rounded-full bg-white p-2 mx-1 hover:bg-gray-300 focus:outline-none"
      onClick={onClick}
    >
      <Icon icon={icon} className="w-8 h-8" />
    </button>
  )
}

interface ControlsProps {
  playing: boolean
  onPlay: () => void
  onNext: () => void
}

const Controls: FunctionComponent<ControlsProps> = ({
  onPlay,
  onNext,
  playing,
}) => {
  return (
    <div className="bg-black inline-block pl-4 py-2 pr-2 rounded-r-full bg-opacity-25">
      <ControlButton icon="previous" onClick={() => ({})} />
      <ControlButton icon={playing ? 'pause' : 'play'} onClick={onPlay} />
      <ControlButton icon="next" onClick={onNext} />
    </div>
  )
}

export default Controls
