import { createAction, handleActions } from 'redux-actions';
import GameDataManager, { GAME_STATE } from '../../utils/gameDataManager';
import shapeDataManager from '../../utils/shapeDataManager';
import mapDataManager from '../../utils/mapDataManager';
import ItemDataManager from '../../utils/itemDataManager';

// actions types

const PLAYER_KEY_DOWN = 'gamePlay/PLAYER_KEY_DOWN';
const GAME_START = 'gamePlay/GAME_START';
const GAME_OVER = 'gamePlay/GAME_OVER';
const GAME_RESULT = 'gamePlay/RESULT';
const GAME_ITEM_USE = 'gamePlay/ITEM_USE';
const GAME_BLOCK_UP = 'gamePlay/BLOCK_UP';
const TOGGLE_CONTROL = 'gamePlay/TOGGLE_CONTROL';
const INIT = 'gamePlay/INIT';

// action creator
export const playerKeyDown = createAction(PLAYER_KEY_DOWN);
export const gameStart = createAction(GAME_START);
export const gameOver = createAction(GAME_OVER);
export const gameResult = createAction(GAME_RESULT);
export const gameItemUse = createAction(GAME_ITEM_USE);
export const gameBlockUp = createAction(GAME_BLOCK_UP);
export const toggleControl = createAction(TOGGLE_CONTROL);
export const init = createAction(INIT);

const initialState = {
  gameGroundData: GameDataManager.defaultGameData(),
  playerBlocks: null,
  gameState: GAME_STATE.READY,
  downStop: false,
  gameResult: null,
  gameItems: 'a'.repeat(10).split('').map(item => 0),
  removedLine: 0,
  isVisibleControl: true,
}

const gameDataManager = new GameDataManager();
const itemDataManager = new ItemDataManager();

// reducer
export default handleActions({
  [PLAYER_KEY_DOWN]: (state, action) => {
    const { payload: keyCode } = action;
    const { gameGroundData, playerBlocks, downStop, gameState, nextBlocks, gameItems } = gameDataManager.handleKeyPress(keyCode, state);
    return {
      ...state,
      gameGroundData,
      playerBlocks,
      downStop: downStop || false,
      gameState: gameState || state.gameState,
      nextBlocks: nextBlocks || state.nextBlocks,
      gameItems: gameItems || state.gameItems
    }
  },
  [GAME_START]: (state, action) => {
    const blockGameState = [GAME_STATE.PLAY];
    if(blockGameState.includes(state.gameState)) return state;
    const { autoDown, mapData } = action.payload;
    const gameGroundData = mapData || mapDataManager.getTestMap();// GameDataManager.defaultGameData();
    const { playerBlocks, nextBlocks } = shapeDataManager.getNextBlocks();
    GameDataManager.mergePlayerBlocks(gameGroundData, playerBlocks);
    return {
      ...state,
      gameState: gameDataManager.gamePlay.play(autoDown, state.gameState),
      gameGroundData,
      playerBlocks,
      nextBlocks,
      gameResult: null,
      gameItems: undefined,
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
    gameDataManager.gamePlay.stop();
    return {
      ...state,
      gameState: GAME_STATE.READY,
      gameResult
    }
  },
  
  [GAME_ITEM_USE]: (state, action) => {
    const { gameGroundData: nextData, gameItems } = itemDataManager.handleItemUse(state, action.payload);
    return {
      ...state,
      gameGroundData: nextData || state.gameGroundData,
      gameItems: gameItems || state.gameItems
    }
  },
  
  [GAME_BLOCK_UP]: (state, action) => {
    const { gameGroundData: nextData } = gameDataManager.blockUp(state, action.payload);
    return {
      ...state,
      gameGroundData: nextData || state.gameGroundData,
    }
  },

  [INIT]: (state, action) => JSON.parse(JSON.stringify(initialState)),

  [TOGGLE_CONTROL]: (state, action) => {
    return {
      ...state,
      isVisibleControl: !state.isVisibleControl
    }
  },
}, initialState);