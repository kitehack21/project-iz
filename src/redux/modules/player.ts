// below rule can be safely turned off thanks to immer used by redux toolkit
/* eslint-disable no-param-reassign */

// Reducers can directly reassign state, or return a new state, BUT NOT BOTH
// Detailed docs on state reassignment in reducers here https://redux-toolkit.js.org/api/createreducer/
// There are pitfalls to immer however, which you can read here https://immerjs.github.io/immer/docs/pitfalls

// import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface InitialStateProps {
//   currIndex: number;
//   isMuted: boolean;
//   indexes: Array<number>;
// }

interface Song {
  title: string;
  artist: string;
  album: string;
  song: string;
  albumart: string;
}

const initialState = {
  currIndex: 0,
  isMuted: false,
  list: [] as Array<Song>,
  status: 'paused',
};

const { actions, reducer } = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play: (state) => {
      state.status = 'playing';
    },
    pause: (state) => {
      state.status = 'paused';
    },
    setMute: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
    },
    addSong: (state, action: PayloadAction<Song>) => {
      state.list.push(action.payload);
    },
    nextSong: (state) => {
      state.currIndex = (state.currIndex + 1) % state.list.length;
    },
    previousSong: (state) => {
      if (state.currIndex - 1 === -1) {
        state.currIndex = state.list.length - 1;
      } else {
        state.currIndex -= 1;
      }
    },
  },
});

export default reducer;

export const {
  setMute,
  addSong,
  pause,
  play,
  nextSong,
  previousSong,
} = actions;
