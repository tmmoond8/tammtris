import { createAction, handleActions } from 'redux-actions';
import GameDataManager, { GAME_STATE } from 'utils/gameDataManager';
import ShapeDataManager from 'utils/shapeDataManager';

// actions types

const PLAYER_KEY_DOWN = 'gamePlay/PLAYER_KEY_DOWN';
const SINGLE_GAME_START = 'gamePlay/SINGLE_GAME_START';
const MULTI_GAME_START = 'gamePlay/MULTI_GAME_START';
const GAME_OVER = 'gamePlay/GAME_OVER';


// action creator
export const playerKeyDown = createAction(PLAYER_KEY_DOWN);
export const singleGameStart = createAction(SINGLE_GAME_START);
export const multiGameStart = createAction(MULTI_GAME_START);
export const gameOver = createAction(GAME_OVER);


const playerBlocks = ShapeDataManager.getEmptyShape();
const gameData = GameDataManager.defaultGameData();
playerBlocks.getShape().forEach(item => {
  gameData[item.y][item.x] = item.dot;
});

const initialState = {
  gameGroundData: gameData,
  playerBlocks: playerBlocks,
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
  [SINGLE_GAME_START]: (state, action) => {
    const blockGameState = [GAME_STATE.PLAY];
    if(blockGameState.includes(state.gameState)) return state;
    const { autoDown, mapData } = action.payload;
    const gameGroundData = mapData || GameDataManager.defaultGameData();
    const playerBlocks = ShapeDataManager.getRandomShape();
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
}, initialState);