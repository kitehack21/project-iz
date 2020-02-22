import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlay,
  faPause,
  faFastBackward,
  faFastForward,
  faVolumeUp,
  faVolumeDown,
  faVolumeMute,
  faVolumeOff,
} from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import store from 'redux/store';
import Page from './components/commons/Page';
import Header from './components/header';
import MusicPlayer from './components/MusicPlayer';
import StickyBottom from './components/MusicPlayer/StickyBottom';
import './bootstrap.css';
import './App.css';

library.add(
  faPlay,
  faPause,
  faFastBackward,
  faFastForward,
  faVolumeUp,
  faVolumeDown,
  faVolumeMute,
  faVolumeOff,
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="stripes" style={{ zIndex: -1 }} />
      <Page>
        <Header />
        <MusicPlayer />
      </Page>
      <StickyBottom song="" />
    </Provider>
  );
};

export default App;
