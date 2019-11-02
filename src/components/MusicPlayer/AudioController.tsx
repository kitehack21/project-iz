import React, { useState, useRef } from 'react'
import playbutton from './play-button.svg'
import pausebutton from './pause-button.svg'
import moment from 'moment'

interface AudioControllerProps {
    song: string
  }

const AudioController: React.FC<AudioControllerProps> = ({song}) => {
    const player = useRef<HTMLAudioElement>(new Audio())
    const [currentTime, setCurrentTime] = useState<number>(-1)
    const slider = useRef<HTMLInputElement>(document.createElement("input"))
    const volumeSlider = useRef<HTMLInputElement>(document.createElement("input"))
    const [currentVolume, setVolume] = useState<number>(0.60)
    const [duration, setDuration] = useState<number>(-1)
    const [isMuted, setMuted] = useState<boolean>(false)
  
    player.current.volume = currentVolume
  
    player.current.oncanplaythrough = ({target}: Event) => {
      const audioTarget = target as HTMLAudioElement
      setCurrentTime(audioTarget.currentTime)
      setDuration(audioTarget.duration)
      player.current.play()
    };
  
    player.current.ontimeupdate = ({target}: Event) => {
      const audioTarget = target as HTMLAudioElement
      setCurrentTime(Math.floor(audioTarget.currentTime))
    }
  
    const onPlay = () => {
      if(song){
        player.current.play()
      }
      else{
        alert("no song selected")
      }
    }
  
    const onPause = () => {
      player.current.pause()
    }
  
    const onMute = () => {
      setMuted(!isMuted)
    }
  
    const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
      player.current.currentTime = parseInt(e.target.value)
    }
  
    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMuted(false)
      setVolume(parseFloat(e.target.value))
    }
  
    console.log(player.current.paused)
  
    return(
      <div className="player-controls d-flex flex-column">
        <div className="d-flex flex-row justify-content-between w-100">
          <div>{currentTime >= 0 ? moment(currentTime*1000).format("mm:ss") : "--:--"}</div>
          <div className="h-100 w-100">
            <input type="range" ref={slider} min={0} max={duration} value={currentTime} onChange={handleSlider} className="seeker"/>
          </div>
          <div>{duration >=0 ? moment(duration*1000).format("mm:ss") : "--:--"}</div>
        </div>
        <div className="d-flex flex-row align-items-center">
          <input type="range" ref={volumeSlider} min={0} max={1.00} value={isMuted ? 0 : currentVolume} onChange={handleVolume} className="seeker" step={0.01}/>
          <div className="ml-2">{isMuted ? 0 : Math.floor(currentVolume * 100)}</div>
        </div>
        <div className="d-flex flex-row">
            {player.current.paused ? 
          <img src={playbutton} onClick={onPlay} className="player-button" alt="play button"/> :        
          <img src={pausebutton} onClick={onPause} className="player-button" alt="pause button"/>}
        </div>
        <button className="w-25" onClick={onMute}>mute</button>
        <audio ref={player} src={song} id="music-player" muted={isMuted} preload={"auto"}/>
      </div>
    )
}

export default AudioController