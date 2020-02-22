import { combineReducers } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
// import { routerReducer } from 'react-router-redux';
// import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import player from './player';

const rootReducer = combineReducers({
  //   routing: routerReducer,
  //   reduxAsyncConnect,
  playerT: player,
});

export default rootReducer;

type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
