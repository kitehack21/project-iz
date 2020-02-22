// below rule can be safely turned off thanks to immer used by redux toolkit
/* eslint-disable no-param-reassign */

// Reducers can directly reassign state, or return a new state, BUT NOT BOTH
// Detailed docs on state reassignment in reducers here https://redux-toolkit.js.org/api/createreducer/
// There are pitfalls to immer however, which you can read here https://immerjs.github.io/immer/docs/pitfalls

// import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

// interface InitialStateProps {
//   currIndex: number;
//   isMuted: boolean;
//   indexes: Array<number>;
// }

const initialState = {
  currIndex: 0,
  isMuted: false,
  indexes: [0],
};

const { actions, reducer } = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play: state => {},
    toggleMute: state => {
      state.isMuted = !state.isMuted;
    },
  },
});

export default reducer;

export const { toggleMute } = actions;
