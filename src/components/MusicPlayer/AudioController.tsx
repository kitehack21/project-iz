import React, { useState, useRef, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
    const [isPaused, setPaused] = useState<boolean>(true)
  
    player.current.volume = currentVolume
  
    player.current.oncanplaythrough = ({target}: Event) => {
      const audioTarget = target as HTMLAudioElement
      setCurrentTime(audioTarget.currentTime)
      setDuration(audioTarget.duration)
      player.current.play()
      setPaused(player.current.paused)
    };
  
    player.current.ontimeupdate = ({target}: Event) => {
      const audioTarget = target as HTMLAudioElement
      setCurrentTime(Math.floor(audioTarget.currentTime))
    }
  
    const onPlay = useCallback(() => {
      if(song){
        player.current.play()
        setPaused(player.current.paused)
      }
      else{
        alert("no song selected")
      }
    }, [song])
  
    const onPause = () => {
      player.current.pause()
      setPaused(player.current.paused)
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
  
    return(
      <div className="player-controls d-flex flex-column w-100">
        <div className="d-flex flex-row justify-content-between w-100 align-items-center">
          <div style={{minWidth: "30px"}}>{currentTime >= 0 ? moment(currentTime*1000).format("mm:ss") : "--:--"}</div>
          <div className="h-100 w-100 mx-2">
            <input type="range" ref={slider} min={0} max={duration} value={currentTime} onChange={handleSlider} className="seeker"/>
          </div>
          <div style={{minWidth: "30px"}}>{duration >=0 ? moment(duration*1000).format("mm:ss") : "--:--"}</div>
        </div>
        <div className="d-flex flex-row">
            {isPaused ? 
          <FontAwesomeIcon icon="play" onClick={onPlay} className="player-button"/>:        
          <FontAwesomeIcon icon="pause" onClick={onPause} className="player-button"/>}
        </div>
        <div className="d-flex flex row align-items-center">
          {
            isMuted 
            ? <FontAwesomeIcon icon="volume-mute" onClick={onMute} className="player-button"/> 
            : <FontAwesomeIcon icon="volume-up" onClick={onMute} className="player-button"/>}
            <div className="d-flex flex-row align-items-center">
              <input type="range" ref={volumeSlider} min={0} max={1.00} value={isMuted ? 0 : currentVolume} onChange={handleVolume} className="seeker" step={0.01}/>
            <div className="ml-2">{isMuted ? 0 : Math.floor(currentVolume * 100)}</div>
          </div>
        </div>
        <audio ref={player} src={song} id="music-player" muted={isMuted} preload={"auto"}/>
      </div>
    )
}

export default AudioController