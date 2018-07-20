import { createAction, handleActions } from 'redux-actions';
import GameDataManager from '../../utils/gameDataManager';
import ShapeDataManager from '../../utils/shapeDataManager';

// actions types

const PLAYER_KEY_DOWN = 'gamePlay/PLAYER_KEY_DOWN';
const GAME_START = 'gamePlay/GAME_START';

// action creator
export const playerKeyDown = createAction(PLAYER_KEY_DOWN);
export const gameStart = createAction(GAME_START);


const playerBlocks = ShapeDataManager.getRandomShape();
const gameData = GameDataManager.defaultGameData();
playerBlocks.getShape().forEach(item => {
  gameData[item.y][item.x] = item.dot;
});

const initialState = {
  gameGroundData: gameData,
  playerBlocks: playerBlocks,
  isGameStart: false
}

// reducer
export default handleActions({
  [PLAYER_KEY_DOWN]: (state, action) => {
    const { payload: keyCode } = action;
    const { gameGroundData, playerBlocks } = GameDataManager.handleKeyPress(keyCode, state);
    return {
      ...state,
      gameGroundData,
      playerBlocks
    }
  },
  [GAME_START]: (state, action) => {
    if(state.isGameStart) return state;
    const { payload: autoDown } = action;
    setInterval(autoDown, 500);
    return {
      ...state,
      isGameStart: !state.isGameStart
    }
  },
}, initialState);