import React from 'react';

import { Provider } from 'react-redux';
import store from 'redux/store';
import Sidebar from 'components/sidebar';
import Page from './components/commons/Page';
import Header from './components/header';
import MusicPlayer from './components/MusicPlayer';
import StickyBottom from './components/MusicPlayer/StickyBottom';
import './bootstrap.css';
import './App.css';
import './Icons';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="stripes" style={{ zIndex: -1 }} />
      <Page>
        <Sidebar />
        <Header />
        <MusicPlayer />
      </Page>
      <StickyBottom song="" />
    </Provider>
  );
};

export default App;
