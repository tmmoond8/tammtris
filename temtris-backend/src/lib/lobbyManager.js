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

	gameCheck(index, userInfo, socketEmit) {
		userInfo = { ...userInfo, gameData: null, gameState: GAME_STATE.READY}
		if(gameList[index].isFull()) return null;
		const userIndex = gameList[index].put(userInfo);
		socketEmit(userIndex);
	},

	getWaitingUserList() {
		return waitingUserList;
	},

	lobbyJoin(user) {
		waitingUserList.push(user);
	},

	lobbyOut(user) {
		waitingUserList = waitingUserList.filter(item => (user && item.id !== user.id));
	}
};

lobbyManager.createGame('tully');
lobbyManager.createGame('baratheon');
lobbyManager.createGame('targaryen');
lobbyManager.createGame('stark');
lobbyManager.createGame('lannister');
lobbyManager.createGame('tyrell');

module.exports = lobbyManager;
