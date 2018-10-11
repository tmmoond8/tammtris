import { createAction, handleActions } from 'redux-actions';
import GameDataManager, { GAME_STATE } from 'utils/gameDataManager';
import shapeDataManager from 'utils/shapeDataManager';

// actions types

const PLAYER_KEY_DOWN = 'gamePlay/PLAYER_KEY_DOWN';
const SINGLE_GAME_START = 'gamePlay/SINGLE_GAME_START';
const MULTI_GAME_START = 'gamePlay/MULTI_GAME_START';
const GAME_OVER = 'gamePlay/GAME_OVER';
const GAME_RESULT = 'gamePlay/RESULT'

// action creator
export const playerKeyDown = createAction(PLAYER_KEY_DOWN);
export const singleGameStart = createAction(SINGLE_GAME_START);
export const multiGameStart = createAction(MULTI_GAME_START);
export const gameOver = createAction(GAME_OVER);
export const gameResult = createAction(GAME_RESULT);

const initialState = {
  gameGroundData: GameDataManager.defaultGameData(),
  playerBlocks: null,
  gameState: GAME_STATE.READY,
  downStop: false,
  gameResult: null,
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
  [SINGLE_GAME_START]: (state, action) => {
    const blockGameState = [GAME_STATE.PLAY];
    if(blockGameState.includes(state.gameState)) return state;
    const { autoDown, mapData } = action.payload;
    const gameGroundData = mapData || GameDataManager.defaultGameData();
    const playerBlocks = shapeDataManager.getRandomShape();
    GameDataManager.mergePlayerBlocks(gameGroundData, playerBlocks);
    return {
      ...state,
      gameState: gameDataManager.gamePlay.play(autoDown, state.gameState),
      gameGroundData,
      playerBlocks
    }
  },
  [GAME_OVER]: (state, action) => {
    gameDataManager.gamePlay.stop();
    return {
      ...state,
      gameState: GAME_STATE.GAME_OVER
    }
  },
  [GAME_RESULT]: (state, action) => {
    const { payload: gameResult } = action;
    gameDataManager.handleGameStop();
    return {
      ...state,
      gameResult
    }
  }
}, initialState);