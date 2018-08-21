const gameManager = require('./gameManager');
const { GAME_STATE } = require('./variable');

let gameList = {};
let gameKey = 1;
let waitingUserList = [];

const lobbyManager = {
	getLobbyData() {
		return {
			waitingUserList,
			gameList: Object.keys(gameList).map(gameNumber => {
				return {
					...gameList[gameNumber],
					gameManager: null,
					players: gameList[gameNumber].getPlayerList()
				}
			})
		}
	},

	getGameManager(gameNumber) {
		return gameList[gameNumber]
	},
	
	createGame(title) {
		gameList[gameKey] = new gameManager(title, gameKey++);
	},

	join(index, userInfo) {
		userInfo = { ...userInfo, gameData: null, gameState: GAME_STATE.READY}
		if(gameList[index].isFull()) return null;
		gameList[index].put(userInfo);
		return gameList[index];
	},
	out(index, userInfo) {
		if(!gameList[index]) return;
		gameList[index].remove(userInfo);
		return gameList;
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

lobbyManager.createGame('winter is comming');
lobbyManager.createGame('ours is the fury');
lobbyManager.createGame('here me roar');
lobbyManager.createGame('fire and blood');
lobbyManager.createGame('family duty honor');
lobbyManager.createGame('we do not sow');

module.exports = lobbyManager;
