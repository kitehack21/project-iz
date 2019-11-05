import React from 'react';
import Page from './components/commons/Page'
import Header from './components/header'
import MusicPlayer from './components/MusicPlayer'
import './bootstrap.css'
import './App.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faPause, faStepForward, faStepBackward, faVolumeUp, faVolumeDown, faVolumeMute, faVolumeOff } from '@fortawesome/free-solid-svg-icons'
 
library.add(faPlay, faPause, faStepForward, faStepBackward, faVolumeUp, faVolumeDown, faVolumeMute, faVolumeOff)


const App: React.FC = () => {
  return (
    <div>
        <div className="stripes" style={{zIndex:-1}}>

        </div>
        <Page>
          <Header/>
          <MusicPlayer/>
        </Page>
    </div>
  );
}

export default App;
