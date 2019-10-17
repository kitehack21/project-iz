import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment'
import './musicplayer.css'
import playbutton from './play-button.svg'
import pausebutton from './pause-button.svg'
const testsong = require('./Lemon.mp3')
const testsong2 = require('./mainactor.mp3')

const MusicPlayer: React.FC = () => {

  const player = useRef<HTMLAudioElement>(new Audio)
  let [currentTime, setCurrentTime] = useState<number>(-1)
  let [duration, setDuration] = useState<number>(-1)
  let [song, setSong] = useState<string>("")

  player.current.oncanplaythrough = (e) => {
    let audioObject = e.target as HTMLAudioElement
    setCurrentTime(audioObject.currentTime)
    setDuration(audioObject.duration)
  };

  player.current.ontimeupdate = (e) => {
    let audioObject = e.target as HTMLAudioElement
    console.log(audioObject.currentTime)
    setCurrentTime(audioObject.currentTime)
  }

  const onPlay = () => {
    player.current.play()
  }
  
  const onPause = () => {
    player.current.pause()
  }

  const onAudioSelect = async (url: string) => {
    setSong(url)
  }
  
  return (
    <div style={{color:"#eeeeee", backgroundColor:"#222831"}} className="d-flex  flex-column align-items-center">
      This is an audio player
      <div>{!song ? "No song selected" : "Song selected"}</div>
      <button onClick={() => onAudioSelect(testsong)}>audio 1</button>
      <button onClick={() => onAudioSelect(testsong2)}>audio 2</button>
      <audio ref={player} src={song} id="music-player"/>
      <div style={{width: "100%", height: "100px", backgroundColor:"#393e46"}} className="d-flex flex-column align-items-center">
        <div className="d-flex flex-row"  style={{color:"#eeeeee"}}>
          <div>{currentTime >= 0 ? moment(currentTime*1000).format("mm:ss") : "--:--"}</div>
          <div>/</div>
          <div>{duration >=0 ? moment(duration*1000).format("mm:ss") : "--:--"}</div>
        </div>
        <div className="d-flex flex-row">
        <img src={playbutton} onClick={onPlay} className="player-button" alt="play button"/>
        <img src={pausebutton} onClick={onPause} className="player-button" alt="pause button"/>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
