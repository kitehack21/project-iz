import React, { useState, useEffect } from 'react';
import moment from 'moment'
import './musicplayer.css'
const testsong = require('./Lemon.mp3')
const testsong2 = require('./mainactor.mp3')

const MusicPlayer: React.FC = () => {
  const audio: HTMLAudioElement = document.createElement('audio');
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [song, setSong] = useState<string>("")
  // const [status, setStatus] = useState<string>("paused")

  audio.src=song
  audio.onloadedmetadata = () => {
    setDuration(audio.duration)
    // audio.addEventListener("timeupdate", handlePlayTimeUpdate)
  };

  const handlePlayTimeUpdate = (e: Event) => {
    let audioTarget = e.target as HTMLAudioElement
    setCurrentTime(audioTarget.currentTime)
  };

  setTimeout(() => {
    setDuration(audio.duration)
  }, 10000)

  // useEffect(() => {
  //   audio.addEventListener("onprogress", handlePlayTimeUpdate)
  // }, [])

  const onPlay = () => {
    audio.play()
  }
  const onStop = async() => {
    await audio.pause()
    await audio.removeEventListener("timeupdate", ()=>{})
  }

  const onAudioSelect = async (url: string) => {
    await audio.pause()
    await audio.load()
    await setSong(url)
    setDuration(audio.duration)
    setCurrentTime(audio.currentTime)
  }
  
  return (
    <div style={{color:"#eeeeee", backgroundColor:"#222831"}}>
      This is an audio player
      <button onClick={() => onAudioSelect(testsong)}>audio 1</button>
      <button onClick={() => onAudioSelect(testsong2)}>audio 2</button>
      <audio src={testsong} id="music-player"/>
      <div style={{width: "100%", height: "100px", backgroundColor:"#393e46"}}>
        <div className="d-flex flex-row"  style={{color:"#eeeeee"}}>
          <div>{moment(currentTime*1000).format("mm:ss")}</div>
          <div>/</div>
          <div>{moment(duration*1000).format("mm:ss")}</div>
        </div>
        <div onClick={onPlay} className="player-button">Play</div>
        <div onClick={onStop} className="player-button">Pause</div>
      </div>
    </div>
  );
}

export default MusicPlayer;
