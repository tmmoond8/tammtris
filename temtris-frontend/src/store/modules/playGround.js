import { createAction, handleActions } from 'redux-actions';
import GameDataManager, { GAME_STATE } from '../../utils/gameDataManager';
import ShapeDataManager from '../../utils/shapeDataManager';

// actions types

const PLAYER_KEY_DOWN = 'gamePlay/PLAYER_KEY_DOWN';
const GAME_START = 'gamePlay/GAME_START';
const GAME_OVER = 'gamePlay/GAME_OVER';
const USER_INFO = 'gamePlay/USER_INFO';

// action creator
export const playerKeyDown = createAction(PLAYER_KEY_DOWN);
export const gameStart = createAction(GAME_START);
export const gameOver = createAction(GAME_OVER);
export const userInfo = createAction(USER_INFO);


const playerBlocks = ShapeDataManager.getRandomShape();
const gameData = GameDataManager.defaultGameData();
playerBlocks.getShape().forEach(item => {
  gameData[item.y][item.x] = item.dot;
});

const initialState = {
  gameGroundData: gameData,
  playerBlocks: playerBlocks,
  userInfo: {name: 'geust', emoji: '🐗'},
  gameState: GAME_STATE.READY,
  downStop: false
}

const gameDataManager = new GameDataManager();

// reducer
export default handleActions({
  [PLAYER_KEY_DOWN]: (state, action) => {
    const { payload: keyCode } = action;
    const { gameGroundData, playerBlocks, downStop, gameState } = gameDataManager.handleKeyPress(keyCode, state);
    return {
      ...state,
      gameGroundData,
      playerBlocks,
      downStop,
      gameState: gameState || state.gameState
    }
  },
  [GAME_START]: (state, action) => {
    const { autoDown, mapData } = action.payload;
    return {
      ...state,
      gameState: gameDataManager.gamePlay.play(autoDown),
      gameGroundData: GameDataManager.defaultGameData()
    }
  },
  [GAME_OVER]: (state, action) => {
    gameDataManager.gamePlay.stop();
    return {
      ...state,
      gameState: GAME_STATE.GAME_OVER
    }
  },
  [USER_INFO]: (state, action) => {
    const { payload: userInfo } = action;
    return {
      ...state,
      userInfo
    }
  }
}, initialState);