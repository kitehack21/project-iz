import React, { useState, useRef} from 'react';
import moment from 'moment'
import './musicplayer.css'
import playbutton from './play-button.svg'
import pausebutton from './pause-button.svg'
const testsong = require('./Lemon.mp3')
const testsong2 = require('./mainactor.mp3')

// const Seeker = () => {

// }

const MusicPlayer: React.FC = () => {
  const player = useRef<HTMLAudioElement>(new Audio())
  const [currentTime, setCurrentTime] = useState<number>(-1)
  const [duration, setDuration] = useState<number>(-1)
  const [song, setSong] = useState<string>("")
  const [isMuted, setMuted] = useState<boolean>(false)
  const [status, setStatus] = useState<string>("paused")

  player.current.oncanplaythrough = ({target}: Event) => {
    let audioTarget = target as HTMLAudioElement
    setCurrentTime(audioTarget.currentTime)
    setDuration(audioTarget.duration)
  };

  player.current.ontimeupdate = ({target}: Event) => {
    let audioObject = target as HTMLAudioElement
    setCurrentTime(audioObject.currentTime)
  }

  player.current.onended = ({target}: Event) => {
    setStatus("paused")
  }

  const onPlay = (): void => {
    console.log(song)
    if(song){
      player.current.play()
      setStatus("playing")
    }
    else{
      alert("no song selected")
    }
  }

  const onPause = (): void => {
    player.current.pause()
    setStatus("paused")
  }

  const onMute = (): void => {
    setMuted(!isMuted)
  }

  const onAudioSelect = (url: string): void => {
    setSong(url)
  }

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>): void => {
    player.current.currentTime = parseInt(e.target.value)
  }
  
  return (
    <div style={{color:"#eeeeee", backgroundColor:"#222831"}} className="d-flex  flex-column align-items-center">
      This is an audio player
      <div>{!song ? "No song selected" : "Song selected"}</div>
      <button onClick={() => onAudioSelect(testsong)}>audio 1</button>
      <button onClick={() => onAudioSelect(testsong2)}>audio 2</button>
      <audio ref={player} src={song} id="music-player" muted={isMuted} preload={"auto"}/>
      <div style={{width: "100%", height: "100px", backgroundColor:"#393e46"}} className="d-flex flex-column align-items-center">
        <div className="d-flex flex-row"  style={{color:"#eeeeee"}}>
          <div>{currentTime >= 0 ? moment(currentTime*1000).format("mm:ss") : "--:--"}</div>
          <div>/</div>
          <div>{duration >=0 ? moment(duration*1000).format("mm:ss") : "--:--"}</div>
        </div>
        <div className="d-flex flex-row">
          <input type="range" min={0} max={duration} value={currentTime} onChange={handleSlider} className="seeker"/>
        {status === "paused" ? 
        <img src={playbutton} onClick={onPlay} className="player-button" alt="play button"/> :        
        <img src={pausebutton} onClick={onPause} className="player-button" alt="pause button"/>}
        <button onClick={onMute}>mute</button>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
