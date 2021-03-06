import React, { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'redux/modules/reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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

interface AudioControllerProps {
  song: string;
}

const AudioController: React.FC<AudioControllerProps> = ({ song }) => {
  const dispatch = useDispatch();
  const playerT = useTypedSelector((state) => state.playerT);

  const player = useRef<HTMLAudioElement>(new Audio());
  const [currentTime, setCurrentTime] = useState<number>(-1);
  const slider = useRef<HTMLInputElement>(document.createElement('input'));
  const volumeSlider = useRef<HTMLInputElement>(
    document.createElement('input'),
  );
  const [currentVolume, setVolume] = useState<number>(0.6);
  const [duration, setDuration] = useState<number>(-1);
  const [isMuted, setMuted] = useState<boolean>(false);
  const [isPaused, setPaused] = useState<boolean>(true);
  const [nowPlayingIndex, setNowPlayingIndex] = useState<number>(0);

  player.current.volume = currentVolume;

  player.current.oncanplaythrough = ({ target }: Event) => {
    const audioTarget = target as HTMLAudioElement;
    setCurrentTime(audioTarget.currentTime);
    setDuration(audioTarget.duration);
    player.current.play();
    setPaused(player.current.paused);
  };

  player.current.ontimeupdate = ({ target }: Event) => {
    const audioTarget = target as HTMLAudioElement;
    setCurrentTime(Math.floor(audioTarget.currentTime));
  };

  const onPlay = useCallback(() => {
    if (song) {
      player.current.play();
      setPaused(player.current.paused);
    } else {
      alert('no song selected');
    }
  }, [song]);

  const onPause = (): void => {
    player.current.pause();
    setPaused(player.current.paused);
  };

  const onMute = (): void => {
    setMuted(!isMuted);
  };

  const onNextSong = (): void => {
    setNowPlayingIndex(nowPlayingIndex + 1);
  };

  const onPreviousSong = (): void => {
    setNowPlayingIndex(nowPlayingIndex + 1);
  };

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>): void => {
    player.current.currentTime = parseInt(e.target.value, 10);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="player-controls d-flex flex-column w-100">
      <div className="d-flex flex-row justify-content-between w-100 align-items-center">
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
      <div className="d-flex flex-row align-items-center justify-content-center">
        <FontAwesomeIcon
          icon="fast-backward"
          className="player-button"
          size="2x"
        />
        {isPaused ? (
          <FontAwesomeIcon
            icon="play"
            onClick={onPlay}
            className="player-button mx-2"
            size="2x"
          />
        ) : (
          <FontAwesomeIcon
            icon="pause"
            onClick={onPause}
            className="player-button mx-2"
            size="2x"
          />
        )}
        <FontAwesomeIcon
          icon="fast-forward"
          className="player-button"
          size="2x"
        />
      </div>
      <div className="d-flex flex-row align-items-center">
        <SpeakerIcon
          onClick={onMute}
          currentVolume={currentVolume}
          isMuted={playerT.isMuted}
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
        src={song}
        id="music-player"
        muted={isMuted}
        preload="auto"
      />
    </div>
  );
};

export default AudioController;
