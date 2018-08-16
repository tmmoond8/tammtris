import { createAction, handleActions } from 'redux-actions';

// actions type
const CHATTING_MESSAGES = 'broadcast/CHATTING_MESSAGE';
const CHATTING_NOTIFY = 'broadcast/CHATTING_NOTIFY';
const ALL_GROUND_DATA = 'broadcast/ALL_GROUND_DATA';
const USER_INFO = 'broadcast/USER_INFO';
const WAITING_ROOM_DATA = 'broadcast/WAITING_ROOM_DATA';

// actions creator
export const chattingMessages = createAction(CHATTING_MESSAGES);
export const chattingNotify = createAction(CHATTING_NOTIFY);
export const allGroundData = createAction(ALL_GROUND_DATA);
export const userInfo = createAction(USER_INFO);
export const waitingRoomData = createAction(WAITING_ROOM_DATA);

const initialState = {
  chattingMessages: [],
  allGroundData: [null, null, null, null, null, null],
  userInfo: {name: 'geust', emoji: '🐗'},
  waitingRoomData: []
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
  [WAITING_ROOM_DATA]: (state, action) => {
    const { payload: roomData } = action;
    return {
      ...state,
      waitingRoomData: roomData
    }
  },
  [CHATTING_NOTIFY]: (state, action) => {
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
  },
  [USER_INFO]: (state, action) => {
    const { payload: userInfo } = action;
    return {
      ...state,
      userInfo
    }
  }
}, initialState);