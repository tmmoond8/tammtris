import { createAction, handleActions } from 'redux-actions';
import GameDataManager from '../../utils/gameDataManager';

// actions type
const CHATTING_MESSAGES = 'gamePlay/CHATTING_MESSAGE';
const ALL_GROUND_DATA = 'gamePlay/ALL_GROUND_DATA';

// actions creator
export const chattingMessages = createAction(CHATTING_MESSAGES);
export const allGroundData = createAction(ALL_GROUND_DATA);

const initialState = {
  chattingMessages: [],
  allGroundData: [{userId: 'ababa', gameData: GameDataManager.defaultGameData()}]
}

// reducer
export default handleActions({
  [CHATTING_MESSAGES]: (state, action) => {
    const { payload: message } = action;
    return {
      ...state,
      chattingMessages: state.chattingMessages.concat(message)
    }
  },
  [ALL_GROUND_DATA]: (state, action) => {
    const { payload: allGroundData } = action;
    return {
      ...state,
      allGroundData
    }
  }
}, initialState);