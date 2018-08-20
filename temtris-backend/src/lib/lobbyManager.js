const gameManager = require('./gameManager');

const GAME_STATE = {
    READY: 'READY',
    PLAY: 'PLAY',
    GAME_OVER: 'GAME_OVER'
  }

class Room {
	constructor(title, number) {
		this.title = title;
		this.number = number;
		this.host = null;
		this.state = GAME_STATE.READY;
		this.gameManager = new gameManager();
	}
}

let roomList = {};
let roomKey = 1;
let waitingUserList = [];

const lobbyManager = {
	getLobbyData() {
		return {
			waitingUserList,
			roomList: Object.keys(roomList).map(roomNumber => {
				return {
					...roomList[roomNumber],
					gameManager: null,
					players: roomList[roomNumber].gameManager.getPlayerList()
				}
			})
		}
	},

	getRoomList() {
		return roomList;
	},

	getRoom(roomNumber) {
		return roomList[roomNumber];
	},

	getGameManager(roomNumber) {
		return this.getRoom(roomNumber).gameManager;
	},
	
	createRoom(title) {
		roomList[roomKey] = new Room(title, roomKey++);
	},

	join(index, userInfo) {
		userInfo = { ...userInfo, gameData: null, gameState: GAME_STATE.READY}
		if(roomList[index].gameManager.isFull()) return null;
		roomList[index].gameManager.put(userInfo);
		return roomList[index];
	},
	out(index, userInfo) {
		if(!roomList[index]) return;
		roomList[index].gameManager.remove(userInfo);
		return roomList;
	},
	getWaitingUserList() {
		return waitingUserList;
	},
	addWaitingUser(user) {
		waitingUserList.push(user);
	},
	removeWaitingUser(user) {
		waitingUserList = waitingUserList.filter(item => item.id !== user.id);
	}
};

lobbyManager.createRoom('winter is comming');
lobbyManager.createRoom('ours is the fury');
lobbyManager.createRoom('here me roar');
lobbyManager.createRoom('fire and blood');
lobbyManager.createRoom('family duty honor');
lobbyManager.createRoom('we do not sow');

module.exports = lobbyManager;

// const user = userManager.addGuest();
// console.log(lobbyManager.getWaitingUserList());
// lobbyManager.addWaitingUser(user);
// lobbyManager.addWaitingUser(userManager.addGuest());
// lobbyManager.addWaitingUser(userManager.addGuest());
// console.log(lobbyManager.getWaitingUserList());
// lobbyManager.removeWaitingUser(user);
// console.log(lobbyManager.getWaitingUserList());

// console.log(lobbyManager.getRoom())
// console.log(lobbyManager.join(0, userManager.addGuest()))
// console.log(lobbyManager.join(0, userManager.addGuest()))
// console.log(lobbyManager.join(0, userManager.addGuest()))
// console.log(lobbyManager.join(0, userManager.addGuest()))
// console.log(lobbyManager.join(0, userManager.addGuest()))
// console.log(lobbyManager.join(0, userManager.addGuest()))
// console.log(lobbyManager.join(0, userManager.addGuest()))
// console.log(lobbyManager.join(0, userManager.addGuest()))
// console.log(lobbyManager.join(1, userManager.addGuest()))
// console.log(lobbyManager.join(2, userManager.addGuest()))
// console.log(lobbyManager.out(2, userManager.addGuest()))
// console.log(lobbyManager.out(2, lobbyManager.getRoom()[2].players[0]))
