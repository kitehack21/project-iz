import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as mmb from 'music-metadata-browser';
import AudioController from './AudioController';
import Draggables from './Draggables';
import { API_URL } from '../../api-url';
import placeholder from './placeholder';
import './musicplayer.css';
import './springs.css';

const arrayBufferToBase64 = (buffer: Array<any>): string => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

interface TrackCardProps {
  albumart: string;
  title: string;
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;
  index?: number;
}

const TrackCard: React.FC<TrackCardProps> = ({
  albumart,
  title,
  onClick,
  index,
}) => {
  return (
    <div
      className="my-1 p-3 playlist-card d-flex flex-row align-items-center"
      onClick={onClick}
      onKeyDown={() => {}}
      role="button"
      tabIndex={index}
    >
      <div
        className="mr-3"
        style={{ width: '60px', height: '60px', border: '1px' }}
      >
        <img
          src={albumart}
          alt="album cover"
          className="w-100"
          style={{ borderRadius: '3px' }}
        />
      </div>
      <div className="flex-grow-1">{title}</div>
      {/* <img src={playbutton} className="player-button" alt="play button"/>  */}
    </div>
  );
};

const TrackList: React.FC = ({ children }) => {
  return (
    <div
      style={{ width: '100%' }}
      className="d-flex flex-column pre-scrollable"
    >
      {children}
    </div>
  );
};

const MusicPlayer: React.FC = () => {
  const [song, setSong] = useState<string>('');
  const [title, setTitle] = useState<string>('NO SONG');
  const [artist, setArtist] = useState<string>('-----');
  const [album, setAlbum] = useState<string>('----');
  const [songs, setSongs] = useState<Array<any>>([]);
  const [albumart, setAlbumart] = useState<string>(placeholder);
  const [playlist, setPlaylist] = useState<Array<any>>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/songs`)
      .then((res: any) => {
        console.log(res.data);
        setSongs(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const getMetaData = (file: any): void => {
    mmb.parseBlob(file).then(metadata => {
      console.log(`Completed parsing of file:`, metadata);
      setTitle(metadata.common.title as string);
      setArtist(metadata.common.artist as string);
      setAlbum(metadata.common.album as string);
      const picture = metadata.common.picture as any;
      const base64string = arrayBufferToBase64(picture[0].data) as string;
      setAlbumart(`data:${picture[0].format as string};base64,${base64string}`);
      setSong(URL.createObjectURL(file));
    });
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files![0] as any;
    getMetaData(file);
  };

  const onAudioSelect = async (item: any): Promise<void> => {
    try {
      const base64string = arrayBufferToBase64(
        item.common.picture[0].data.data,
      ) as string;
      setTitle(item.common.title as string);
      setArtist(item.common.artist as string);
      setAlbum(item.common.album as string);
      setAlbumart(
        `data:${item.common.picture[0].data.format};base64,${base64string}`,
      );
      setSong(`${API_URL}/${item.url}`);
    } catch (err) {
      console.error(err);
    }
  };

  const RenderSongs: React.FC = () => {
    const arrJSX = songs.map((item: any, index: number) => {
      const base64string = arrayBufferToBase64(
        item.common.picture[0].data.data,
      ) as string;

      return (
        <TrackCard
          key={JSON.stringify(item)}
          albumart={`data:${item.common.picture[0].data.format};base64,${base64string}`}
          onClick={() => onAudioSelect(item)}
          title={item.common.title}
          index={index}
        />
      );
    });

    return <>{arrJSX}</>;
  };

  return (
    <div className="player-container d-flex flex-column">
      <div
        className="d-flex flex-row p-5"
        style={{
          background: '#9AA5B1',
          borderTopLeftRadius: '3px',
          borderTopRightRadius: '3px',
        }}
      >
        <div
          className="mr-3"
          style={{ width: '150px', height: '150px', border: '1px' }}
        >
          <img
            src={albumart}
            alt="album cover"
            className="w-100"
            style={{ borderRadius: '3px' }}
          />
        </div>
        <div className="w-100 d-flex flex-row">
          <div className="player-info">
            <div>{title}</div>
            <div>{artist}</div>
            <div>{album}</div>
          </div>
          <AudioController song={song} />
        </div>
      </div>
      <input type="file" onChange={onFileSelect} />
      <div className="p-5">
        <div>Playlist</div>
        <TrackCard albumart={albumart} onClick={() => {}} title="test" />
        <TrackList>
          <RenderSongs />
        </TrackList>
        <Draggables items={['a', 'b', 'c']} />
      </div>
    </div>
  );
};

export default MusicPlayer;
