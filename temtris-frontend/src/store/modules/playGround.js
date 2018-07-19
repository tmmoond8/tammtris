import { createAction, handleActions } from 'redux-actions';
import gameDataManager from '../../utils/gameDataManager';

// actions types

const SET_GAME_GROUND_DATA = 'gamePlay/SET_GAME_GROUND_DATA';
const SET_PLAYER_BLOCKS = 'gamePlay/SET_PLAYER_BLOCKS';

// action creator
export const setGameGroundData = createAction(SET_GAME_GROUND_DATA);
export const setPlayerBlocks = createAction(SET_PLAYER_BLOCKS);

const initialState = {
  gameGroundData: gameDataManager.defaultGameData(),
  palyerBlocks: []
}

// reducer
export default handleActions({
  [SET_GAME_GROUND_DATA]: (state, action) => {
    const { playload: gameGroundData } = action;
    return state.set('gameGroundData', gameGroundData);
  },
  [SET_PLAYER_BLOCKS]: (state, action) => {
    const { payload: playerBlocks } = action;
    return state.set('playerBlocks', playerBlocks);
  }
}, initialState);