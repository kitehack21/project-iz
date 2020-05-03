import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useTypedSelector } from 'redux/modules/reducer';
import {
  setMute,
  play,
  pause,
  nextSong,
  previousSong,
} from 'redux/modules/player';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import placeholder from './placeholder';

interface SpeakerIconProps {
  currentVolume: number;
  onClick?(): void;
  isMuted?: boolean;
}

const SpeakerIcon: React.FC<SpeakerIconProps> = ({
  currentVolume,
  onClick,
  isMuted,
}) => {
  let icon: IconProp = 'volume-down';
  if (currentVolume === 0) {
    icon = 'volume-off';
  }
  if (currentVolume > 0.5) {
    icon = 'volume-up';
  }
  if (isMuted) {
    icon = 'volume-mute';
  }

  return (
    <div className="mr-2">
      <FontAwesomeIcon
        icon={icon}
        onClick={onClick}
        className="player-button fa-fw"
        size="lg"
      />
    </div>
  );
};

const AudioController: React.FC = () => {
  const dispatch = useDispatch();
  const { list, currIndex, isMuted, status } = useTypedSelector(
    (state) => state.playerT,
  );

  const player = useRef<HTMLAudioElement>(new Audio());
  const slider = useRef<HTMLInputElement>(document.createElement('input'));
  const volumeSlider = useRef<HTMLInputElement>(
    document.createElement('input'),
  );

  const [currentTime, setCurrentTime] = useState<number>(-1);
  const [currentVolume, setVolume] = useState<number>(0.6);
  const [duration, setDuration] = useState<number>(-1);

  player.current.volume = currentVolume;

  player.current.oncanplaythrough = ({ target }: Event) => {
    const audioTarget = target as HTMLAudioElement;
    setCurrentTime(audioTarget.currentTime);
    setDuration(audioTarget.duration);
    player.current.play();
    dispatch(play());
  };

  player.current.ontimeupdate = ({ target }: Event) => {
    const audioTarget = target as HTMLAudioElement;
    setCurrentTime(Math.floor(audioTarget.currentTime));
  };

  useEffect(() => {
    if (player.current.paused) {
      dispatch(pause());
    } else {
      dispatch(play());
    }
  }, [dispatch]);

  const onPlay = useCallback(() => {
    player.current.play();
    dispatch(play());
  }, []);

  const onPause = (): void => {
    player.current.pause();
    dispatch(pause());
  };

  const onMute = (): void => {
    dispatch(setMute(true));
  };

  const onNextSong = (): void => {
    dispatch(nextSong());
  };

  const onPreviousSong = (): void => {
    dispatch(previousSong());
  };

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>): void => {
    player.current.currentTime = parseInt(e.target.value, 10);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setMute(false));
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div
      className="player-controls d-flex flex-column w-100 navbar fixed-bottom"
      style={{ height: '80px', backgroundColor: 'white' }}
    >
      <div className="d-flex flex-row">
        <div
          className="mr-3"
          style={{ width: '60px', height: '60px', border: '1px' }}
        >
          <img
            src={list[currIndex]?.albumart || placeholder}
            alt="album cover"
            className="w-100"
            style={{ borderRadius: '3px' }}
          />
        </div>
        <div className="d-flex flex-column">
          <div style={{ fontSize: '18px' }}>
            {list[currIndex]?.title || '-----'}
          </div>
          <div style={{ fontSize: '12px' }}>
            {list[currIndex]?.artist || '----'}
          </div>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-center">
        <FontAwesomeIcon
          icon="fast-backward"
          className="player-button"
          size="1x"
          onClick={onPreviousSong}
        />
        {status === 'paused' ? (
          <FontAwesomeIcon
            icon="play"
            onClick={onPlay}
            className="player-button mx-2"
            size="1x"
          />
        ) : (
          <FontAwesomeIcon
            icon="pause"
            onClick={onPause}
            className="player-button mx-2"
            size="1x"
          />
        )}
        <FontAwesomeIcon
          icon="fast-forward"
          className="player-button"
          size="1x"
          onClick={onNextSong}
        />
      </div>
      <div className="d-flex flex-row justify-content-between w-50 align-items-center">
        <div style={{ minWidth: '30px' }}>
          {currentTime >= 0
            ? moment(currentTime * 1000).format('mm:ss')
            : '--:--'}
        </div>
        <div className="h-100 w-100 mx-2">
          <input
            type="range"
            ref={slider}
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSlider}
            className="seeker"
          />
        </div>
        <div style={{ minWidth: '30px' }}>
          {duration >= 0 ? moment(duration * 1000).format('mm:ss') : '--:--'}
        </div>
      </div>
      <div className="d-flex flex-row align-items-center">
        <SpeakerIcon
          onClick={onMute}
          currentVolume={currentVolume}
          isMuted={isMuted}
        />
        <div className="d-flex flex-row align-items-center">
          <input
            type="range"
            ref={volumeSlider}
            min={0}
            max={1.0}
            value={isMuted ? 0 : currentVolume}
            onChange={handleVolume}
            className="seeker"
            step={0.01}
          />
          <div className="ml-2">
            {isMuted ? 0 : Math.floor(currentVolume * 100)}
          </div>
        </div>
      </div>
      <audio
        ref={player}
        src={list[currIndex]?.song}
        id="music-player"
        muted={isMuted}
        preload="auto"
      />
    </div>
  );
};

export default AudioController;
