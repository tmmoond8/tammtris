import { createAction, handleActions } from 'redux-actions';

// actions type
const ADD_CHATTING_MESSAGE = 'broadcast/ADD_CHATTING_MESSAGES';
const ADD_CHATTING_NOTIFY = 'broadcast/ADD_CHATTING_NOTIFY';
const SET_ALL_PLAY_DATA = 'broadcast/SET_ALL_PLAY_DATA';
const SET_USER_INFO = 'broadcast/SET_USER_INFO';
const SET_LOBBY_DATA = 'broadcast/SET_LOBBY_DATA';
const SET_GAME_ROOM = 'broadcast/SET_GAME_ROOM';
const CHANGE_TEAM = 'broadcast/CHANGE_TEAM';

// actions creator
export const addChattingMessage = createAction(ADD_CHATTING_MESSAGE);
export const addChattingNotify = createAction(ADD_CHATTING_NOTIFY);
export const setAllPlayData = createAction(SET_ALL_PLAY_DATA);
export const setUserInfo = createAction(SET_USER_INFO);
export const setLobbyData = createAction(SET_LOBBY_DATA);
export const setGameRoom = createAction(SET_GAME_ROOM);
export const changeTeam = createAction(CHANGE_TEAM);

const initialState = {
  chattingMessages: [],
  allGroundData: [null, null, null, null, null, null],
  userInfo: {name: 'geust', emoji: '🐗', id: 'testID'},
  lobbyData: {gameList: [], waitingUserList: []},
  gameRoom: null,
  team: 'individual'
}

// reducer
export default handleActions({
  [ADD_CHATTING_MESSAGE]: (state, action) => {
    const { payload: message } = action;
    return {
      ...state,
      chattingMessages: state.chattingMessages.concat(message)
    }
  },
  [SET_GAME_ROOM]: (state, action) => {
    const { payload: gameRoom } = action;
    return {
      ...state,
      gameRoom: gameRoom
    }
  },
  [SET_LOBBY_DATA]: (state, action) => {
    const { payload: lobbyData } = action;
    return {
      ...state,
      lobbyData: lobbyData
    }
  },
  [ADD_CHATTING_NOTIFY]: (state, action) => {
    const { payload: message } = action;
    return {
      ...state,
      chattingMessages: state.chattingMessages.concat(message)
    }
  },
  [SET_ALL_PLAY_DATA]: (state, action) => {
    const { payload: allGroundData } = action;
    return {
      ...state,
      allGroundData
    }
  },
  [SET_USER_INFO]: (state, action) => {
    const { payload: userInfo } = action;
    return {
      ...state,
      userInfo
    }
  },
  [CHANGE_TEAM]: (state, action) => {
    const { payload: team } = action;
    return {
      ...state,
      team
    }
  }
}, initialState);