import { createAction, handleActions } from 'redux-actions';

// actions type
const CHATTING_MESSAGES = 'gamePlay/CHATTING_MESSAGE';
const ALL_GROUND_DATA = 'gamePlay/ALL_GROUND_DATA';

// actions creator
export const chattingMessages = createAction(CHATTING_MESSAGES);
export const allGroundData = createAction(ALL_GROUND_DATA);

const initialState = {
  chattingMessages: [],
  allGroundData: [null, null, null, null, null, null]
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
    console.log(allGroundData)
    return {
      ...state,
      allGroundData
    }
  }
}, initialState);