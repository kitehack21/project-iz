import React, { useState, useRef} from 'react';
import moment from 'moment'
import './musicplayer.css'
import './springs.css'
import playbutton from './play-button.svg'
import pausebutton from './pause-button.svg'
import testcover from './cover.jpg'
import Draggables from './Draggables'
const testsong = require('./Lemon.mp3')
const testsong2 = require('./mainactor.mp3')


const MusicPlayer: React.FC = () => {
  const player = useRef<HTMLAudioElement>(new Audio())
  const slider = useRef<HTMLInputElement>(document.createElement("input"))
  const volumeSlider = useRef<HTMLInputElement>(document.createElement("input"))
  const [currentTime, setCurrentTime] = useState<number>(-1)
  const [currentVolume, setVolume] = useState<number>(0.60)
  const [duration, setDuration] = useState<number>(-1)
  const [song, setSong] = useState<string>("")
  const [isMuted, setMuted] = useState<boolean>(false)
  const [status, setStatus] = useState<string>("paused")

  player.current.volume = currentVolume

  player.current.oncanplaythrough = ({target}: Event) => {
    const audioTarget = target as HTMLAudioElement
    setCurrentTime(audioTarget.currentTime)
    setDuration(audioTarget.duration)
  };

  player.current.ontimeupdate = ({target}: Event) => {
    const audioObject = target as HTMLAudioElement
    setCurrentTime(audioObject.currentTime)
  }

  player.current.onended = () => {
    setStatus("paused")
  }

  const onPlay = () => {
    console.log(song)
    if(song){
      player.current.play()
      setStatus("playing")
    }
    else{
      alert("no song selected")
    }
  }

  const onPause = () => {
    player.current.pause()
    setStatus("paused")
  }

  const onMute = () => {
    setMuted(!isMuted)
  }

  const onAudioSelect = async(url: string) => {
    await setSong(url)
    await setStatus("playing")
    await player.current.play()
  }

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    player.current.currentTime = parseInt(e.target.value)
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setVolume(parseFloat(e.target.value))
  }

  return (
    <div className="player-container container-fluid p-5 d-flex flex-column">
      This is an audio player
      <div className="d-flex flex-row">
        <div className="mr-3" style={{width:"150px", height:"150px", border:"1px"}}>
          <img src={testcover} alt="album cover" className="w-100" style={{borderRadius:"3px"}}/>
        </div>
        <div className="w-100">
          <div className="player-info">
          <div>{!song ? "No song selected" : "Song selected"}</div>
            <div>SONG TITLE</div>
            <div>
              ARTIST IZONE
            </div>
            <div>
              ALBUM
            </div>
          </div>
          <div className="player-controls d-flex flex-column">
            <div className="d-flex flex-row justify-content-between w-100">
              <div>{currentTime >= 0 ? moment(currentTime*1000).format("mm:ss") : "--:--"}</div>
              <div className="h-100 w-100">
                <input type="range" ref={slider} min={0} max={duration} value={currentTime} onChange={handleSlider} className="seeker"/>
              </div>
              <div>{duration >=0 ? moment(duration*1000).format("mm:ss") : "--:--"}</div>
            </div>
            <div className="d-flex flex-row align-items-center">
              <input type="range" ref={volumeSlider} min={0} max={1.00} value={currentVolume} onChange={handleVolume} className="seeker" step={0.01}/>
              <div className="ml-2">{Math.floor(currentVolume * 100)}</div>
            </div>
            <div className="d-flex flex-row">
                {status === "paused" ? 
              <img src={playbutton} onClick={onPlay} className="player-button" alt="play button"/> :        
              <img src={pausebutton} onClick={onPause} className="player-button" alt="pause button"/>}
            </div>
          </div>
        </div>
      </div>
      <button className="w-25" onClick={() => onAudioSelect(testsong)}>audio 1</button>
      <button className="w-25" onClick={() => onAudioSelect(testsong2)}>audio 2</button>
      <button className="w-25" onClick={onMute}>mute</button>
      <audio ref={player} src={song} id="music-player" muted={isMuted} preload={"auto"}/>
      <div>Playlist</div>
      <div style={{width: "100%"}} className="d-flex flex-column pre-scrollable">
        <div className="my-1 p-3 playlist-card">TESTING CARD</div>
        <div className="my-1 p-3 playlist-card">TESTING CARD</div>
        <div className="my-1 p-3 playlist-card">TESTING CARD</div>
        <div className="my-1 p-3 playlist-card">TESTING CARD</div>
        <div className="my-1 p-3 playlist-card">TESTING CARD</div>
        <div className="my-1 p-3 playlist-card">TESTING CARD</div>
        <div className="my-1 p-3 playlist-card">TESTING CARD</div>
        <div className="my-1 p-3 playlist-card">TESTING CARD</div>
        <div className="my-1 p-3 playlist-card">TESTING CARD</div>
        <div className="my-1 p-3 playlist-card">TESTING CARD</div>
        <div className="my-1 p-3 playlist-card">TESTING CARD</div>
        <div className="my-1 p-3 playlist-card">TESTING CARD</div>
        <div className="my-1 p-3 playlist-card">TESTING CARD</div>
        <div className="my-1 p-3 playlist-card">TESTING CARD</div>
        <div className="my-1 p-3 playlist-card">TESTING CARD</div>
      </div>
      <div className="container-fluid"> 
        <Draggables items={["a","b","c"]}/>
      </div>
    </div>
  );
}

export default MusicPlayer;
