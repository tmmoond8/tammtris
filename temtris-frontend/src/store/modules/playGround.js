import { createAction, handleActions } from 'redux-actions';
import GameDataManager from '../../utils/gameDataManager';
import ShapeDataManager from '../../utils/shapeDataManager';

// actions types

const PLAYER_KEY_DOWN = 'gamePlay/PLAYER_KEY_DOWN';
const GAME_START = 'gamePlay/GAME_START';
const PLAYER_INFO = 'gamePlay/PLAYER_INFO';
const CHATTING_MESSAGES = 'gamePlay/CHATTING_MESSAGE';

// action creator
export const playerKeyDown = createAction(PLAYER_KEY_DOWN);
export const gameStart = createAction(GAME_START);
export const playerInfo = createAction(PLAYER_INFO);
export const chattingMessages = createAction(CHATTING_MESSAGES);


const playerBlocks = ShapeDataManager.getRandomShape();
const gameData = GameDataManager.defaultGameData();
playerBlocks.getShape().forEach(item => {
  gameData[item.y][item.x] = item.dot;
});

const initialState = {
  gameGroundData: gameData,
  playerBlocks: playerBlocks,
  userInfo: {name: 'geust', emoji: '🐗'},
  chattingMessages: [],
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
  [PLAYER_INFO]: (state, action) => {
    const { payload: userInfo } = action;
    return {
      ...state,
      userInfo
    }
  },
  [CHATTING_MESSAGES]: (state, action) => {
    const { payload: message } = action;
    return {
      ...state,
      chattingMessages: state.chattingMessages.concat(message)
    }
  }
}, initialState);