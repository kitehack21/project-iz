import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment'
import './musicplayer.css'
import './springs.css'
import playbutton from './play-button.svg'
import pausebutton from './pause-button.svg'
import testcover from './cover.jpg'
import Draggables from './Draggables'
import * as mmb from 'music-metadata-browser';
import axios from 'axios'
import { API_URL }from '../../api-url.js'
const testsong = require('./test-audio/Lemon.mp3')
const testsong2 = require('./test-audio/mainactor.mp3')


const MusicPlayer: React.FC = () => {
  const player = useRef<HTMLAudioElement>(new Audio())
  const slider = useRef<HTMLInputElement>(document.createElement("input"))
  const volumeSlider = useRef<HTMLInputElement>(document.createElement("input"))
  const [currentTime, setCurrentTime] = useState<number>(-1)
  const [currentVolume, setVolume] = useState<number>(0.60)
  const [duration, setDuration] = useState<number>(-1)
  const [song, setSong] = useState<string>("")
  const [isMuted, setMuted] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("NO SONG")
  const [artist, setArtist] = useState<string>("-----")
  const [album, setAlbum] = useState<string>("----")
  const [songs, setSongs] = useState<Array<any>>([])

  useEffect(() => {
    axios.get(API_URL + '/songs')
    .then((res: any) => {
      setSongs(res.data)
    })
    .catch((err: any) => {
      console.log(err)
    })
  }, [isMuted])
  
  player.current.volume = currentVolume

  player.current.oncanplaythrough = ({target}: Event) => {
    const audioTarget = target as HTMLAudioElement
    setCurrentTime(audioTarget.currentTime)
    setDuration(audioTarget.duration)
    player.current.play()
  };

  player.current.ontimeupdate = ({target}: Event) => {
    const audioObject = target as HTMLAudioElement
    setCurrentTime(audioObject.currentTime)
  }

  const getMetaData = (file: any): void => {
    mmb.parseBlob(file, {native: true}).then(metadata => {
      console.log(`Completed parsing of file:`, metadata);
      setTitle(metadata.common.title as string)
      setArtist(metadata.common.artist as string)
      setAlbum(metadata.common.album as string)
      setSong(URL.createObjectURL(file))
    })
  }

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0] as any
    getMetaData(file)
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

  const onAudioSelect = async(url: string) => {
    try{
      console.log(url)
      await setSong(url)
    }
    catch(err){
      console.error(err)
    }
  }

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    player.current.currentTime = parseInt(e.target.value)
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMuted(false)
    setVolume(parseFloat(e.target.value))
  }

  const RenderSongs: React.FC = () => {
    const arrJSX = songs.map((item: any) => {
      const fileURL = API_URL + "/" + item
      return <div className="my-1 p-3 playlist-card" key={JSON.stringify(item)}>TESTING CARD <img src={playbutton} onClick={() => onAudioSelect(fileURL)} className="player-button" alt="play button"/> </div>
    })
    return <React.Fragment>
      {arrJSX}
    </React.Fragment>
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
            <div>{title}</div>
            <div>
              {artist}
            </div>
            <div>
              {album}
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
              <input type="range" ref={volumeSlider} min={0} max={1.00} value={isMuted ? 0 : currentVolume} onChange={handleVolume} className="seeker" step={0.01}/>
              <div className="ml-2">{isMuted ? 0 : Math.floor(currentVolume * 100)}</div>
            </div>
            <div className="d-flex flex-row">
                {player.current.paused ? 
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
      <input type="file" onChange={onFileSelect}/>
      {
        //@ts-ignore
      <input type="file" directory=""  webkitdirectory=""/>}
      <div>Playlist</div>
      <div style={{width: "100%"}} className="d-flex flex-column pre-scrollable">
        <div className="my-1 p-3 playlist-card">TESTING CARD     <img src={playbutton} onClick={() => onAudioSelect(testsong)} className="player-button" alt="play button"/> </div>
        {/* <div className="my-1 p-3 playlist-card">TESTING CARD</div>
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
        <div className="my-1 p-3 playlist-card">TESTING CARD</div> */}
        <RenderSongs/>
      </div>
      <div className="container-fluid"> 
        <Draggables items={["a","b","c"]}/>
      </div>
    </div>
  );
}

export default MusicPlayer;
