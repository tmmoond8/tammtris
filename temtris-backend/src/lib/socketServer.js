const userManager = require('./userManager');
const lobbyManager = require('./lobbyManager');
const { GAME_STATE } = require('./variable');

const MESSAGE_TYPE = {
  BROADCAST: 0,
  NOTIFY: 32
}
const LOBBY = 'lobby';
const MESSAGE = 'message';
const LOBBY_JOIN = 'lobby/join';
const LOBBY_DATA = 'lobby/data';
const GAME_CHECK = 'game/check';
const GAME_JOIN = 'game/join';
const GAME_START = 'game/start';
const GAME_DATA = 'game/data';
const GAME_TEAM_CHANGE = 'game/teamChange';
const GAME_RESULT = 'game/result';

class Message {
	constructor(user, message, type) {
		this.user = user;
		this.message = message || '';
		this.type = type | MESSAGE_TYPE.BROADCAST;
	}

	setMessageId() {
		this.messageId = Message.createMessageId();
	};

	static createMessageId() {
		const toDay = new Date().toISOString().slice(0,19)
			.replace(/-/g,"").replace(/t/gi, "").replace(/:/g, "");
		return toDay + Math.floor((1 + Math.random()) * 31);
	}
}

module.exports = function(io) {
  io.on('connection', (socket) => {
		console.log('---------------[ON] ----- socket ON')
		socket.on(LOBBY_JOIN, () => {
			lobby.join(socket);
		});

		socket.on(MESSAGE, (msg) => {
			message(socket, msg);
		});

		socket.on(GAME_JOIN, (req) => {
			console.log(`play join ${req}`);
			lobby.out(socket);
			playGround.join(socket, req);
		});

		socket.on(GAME_CHECK, (req) => {
			playGround.check(socket, req);
		});

		socket.on(GAME_DATA, (req) => {
			playGround.updateGameData(socket, req)
		});

		socket.on('disconnect', () => {
			playGround.out(socket);
			lobby.out(socket);
		});

		socket.on(GAME_START, () => {
			const gameManager = lobbyManager.getGameManager(socket.chattingChannel);
			if(gameManager.gameStart()) {
				io.to(socket.chattingChannel).emit(GAME_START);
			}
		})

		socket.on(GAME_TEAM_CHANGE, (msg) => {
			changeTeam(socket, msg);
		})
  });

  const lobby = {
		join(socket) {
			const userInfo = userManager.addGuest();
			socket.join(LOBBY);
			socket.join(userInfo.id);
			socket.chattingChannel = LOBBY;
			socket.userInfo = userInfo;
			io.to(socket.userInfo.id).emit(LOBBY_JOIN, userInfo);
			io.to(socket.chattingChannel).emit(LOBBY_DATA, lobbyManager.getLobbyData());
			lobbyManager.lobbyJoin(userInfo);
			console.log(`userList : ${userManager.getUserList()}`)
			console.log(`lobby : ${userInfo.name}`)
		},
		out(socket) {
			const { userInfo } = socket;
			socket.leave(LOBBY);
			lobbyManager.lobbyOut(userInfo);
			userManager.removeUser(userInfo);
			io.to(LOBBY).emit(LOBBY_DATA, lobbyManager.getLobbyData());
		}
  }

  const playGround = {
    check(socket, req) {
      const { gameNumber } = req;
      lobbyManager.gameCheck(gameNumber, socket.userInfo, () => {
				const gameRoom = {
					...lobbyManager.getGameManager(gameNumber)
				};
				delete gameRoom.gameData;
				io.to(socket.userInfo.id).emit(GAME_CHECK, gameRoom);
			});
    },
    join(socket, req) {
			const { userInfo, gameNumber } = req;
			socket.chattingChannel = gameNumber;
			socket.join(gameNumber);
			notify(socket, `${userInfo.emoji} ${userInfo.name}님께서 입장하였습니다.`);
			lobbyManager.getGameManager(gameNumber).put(userInfo);
			io.to(LOBBY).emit(LOBBY_DATA, lobbyManager.getLobbyData());
			io.to(gameNumber).emit(GAME_DATA, lobbyManager.getGameManager(gameNumber).gameData);
      console.log('---- [JOIN] ----- ', gameNumber);
    },
    out(socket) {
      const { userInfo, chattingChannel } = socket;
      if (userInfo && !!lobbyManager.getGameManager(chattingChannel)) {
				this.gameOver(socket, { userInfo });
				notify(socket, `${userInfo.emoji} ${userInfo.name}님께서 퇴장하셨습니다.`);
				lobbyManager.getGameManager(chattingChannel).remove(userInfo);
				socket.leave(chattingChannel);
        io.to(chattingChannel).emit(GAME_DATA, lobbyManager.getGameManager(chattingChannel).gameData);
      }
		},
		updateGameData(socket, req) {
			const { chattingChannel } = socket;
			const { userInfo, gameData, gameState } = req;
			userInfo.gameData = gameData;
			userInfo.gameState = gameState;
			lobbyManager.getGameManager(chattingChannel).updateGameData(userInfo);
			io.to(chattingChannel).emit(GAME_DATA, lobbyManager.getGameManager(chattingChannel).gameData);
			gameState === GAME_STATE.GAME_OVER && this.gameOver(socket, req);
		},
		gameOver(socket, req) {
			const { chattingChannel } = socket;
			const { userInfo } = req;
			lobbyManager.getGameManager(chattingChannel).gameOver(userInfo, (gameResult)=> {
				gameResult.forEach(result => {
					io.to(result.id).emit(GAME_RESULT, result.gameResult);
				})
			});
		}
  }

  const message = (socket, msg) => {
		msg.messageId = Message.createMessageId();
		io.to(socket.chattingChannel).emit(MESSAGE, msg);
  };

  const notify = (socket, msg) => {
		const message = new Message({}, msg, MESSAGE_TYPE.NOTIFY);;
		message.messageId = Message.createMessageId();
		io.to(socket.chattingChannel).emit(MESSAGE, message);
  }

  const gameState = () => {
		io.to(socket.chattingChannel).emit(GAME_START, {});
  }

  const changeTeam = (socket, msg) => {
		const { chattingChannel } = socket;
		const { userInfo, team } = msg;
		lobbyManager.getGameManager(chattingChannel).changeTeam (userInfo, team, () => {
			io.to(chattingChannel).emit(GAME_DATA, lobbyManager.getGameManager(chattingChannel).gameData);
			io.to(userInfo.id).emit(GAME_TEAM_CHANGE, team);
		});
  }
};