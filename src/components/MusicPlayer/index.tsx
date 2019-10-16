import React, { useState } from 'react';
import moment from 'moment'
const testsong = require('./Lemon.mp3')
const testsong2 = require('./02.main actor.mp3')

const MusicPlayer: React.FC = () => {
  // let audio = new Audio(testsong)
  const audio: HTMLAudioElement = document.createElement('audio');
  const [duration, setDuration] = useState<number>(0)
  const [song, setSong] = useState<string>("")

  audio.src=song
  audio.onloadedmetadata = () => {
    setDuration(audio.duration)
  };

  const onPlay = () => {
    console.log(audio)
    audio.play()
  }
  const onStop = async() => {
    console.log(audio)
    audio.load()
    audio.pause()
  }

  const onAudioSelect = (url: string) => {
    // audio.src = url
    setSong(url)
    audio.load()
  }

  
  return (
    <div >
      This is an audio player
      <button onClick={() => onAudioSelect(testsong)}>audio 1</button>
      <button onClick={() => onAudioSelect(testsong2)}>audio 2</button>
      <audio src={testsong} id="music-player"/>
      <div style={{width: "100%", height: "100px", backgroundColor:"blue"}}>
        <div className="d-flex flex-row">
          <div>{moment(duration*1000).format("mm:ss")}</div>
          <div>/</div>
          <div>{moment(duration*1000).format("mm:ss")}</div>
        </div>
      </div>
      <button onClick={onPlay} className="form-control">Play</button>
      <button onClick={onStop} className="form-control">Pause</button>
    </div>
  );
}

export default MusicPlayer;
