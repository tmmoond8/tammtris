const userManager = require('./userManager');
const gameManager = require('./gameManager');
const lobbyManager = require('./lobbyManager');

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
			// gameData(socket, req);
		});

		socket.on('disconnect', () => {
			playGround.out(socket);
			lobby.out(socket);
		});

		socket.on(GAME_START, () => {
			gameState();
		})

		socket.on(GAME_TEAM_CHANGE, (msg) => {
			changeTeam(socket, msg);
		})
  });


  // const gameData = (response) => {
	// 	const { roomNumber } = response;
  //   lobbyManager.getRoom(roomNumber).put(response);
  //   io.sockets.emit(GAME_DATA, lobbyManager.getRoom(roomNumber).gameData);
  // };

  const lobby = {
		join(socket) {
			const userInfo = userManager.addGuest();
			socket.join(LOBBY);
			socket.join(userInfo.id);
			lobbyManager.addWaitingUser(userInfo);
			socket.chattingRoom = LOBBY;
			socket.userInfo = userInfo;
			io.to(socket.userInfo.id).emit(LOBBY_JOIN, userInfo);
			io.to(socket.chattingRoom).emit(LOBBY_DATA, lobbyManager.getLobbyData());
			console.log(`userList : ${userManager.getUserList()}`)
			console.log(`lobby : ${userInfo.name}`)
		},
		out(socket) {
			const { userInfo } = socket;
			socket.leave(LOBBY);
			lobbyManager.removeWaitingUser(userInfo);
			io.to(LOBBY).emit(LOBBY_DATA, lobbyManager.getLobbyData());
		}
  }

  const playGround = {
    check(socket, req) {
      const { roomNumber } = req;
      lobbyManager.join(roomNumber, socket.userInfo);
      io.to(socket.userInfo.id).emit(GAME_CHECK, lobbyManager.getRoom(roomNumber));
    },
    join(socket, req) {
      const { userInfo, roomNumber } = req;
			socket.chattingRoom = roomNumber;
			socket.join(roomNumber);
			notify(socket, `${userInfo.emoji} ${userInfo.name}님께서 입장하였습니다.`);
      
			lobbyManager.getGameManager(roomNumber).put(userInfo);
			io.to(LOBBY).emit(LOBBY_DATA, lobbyManager.getLobbyData());
			io.to(roomNumber).emit(GAME_DATA, lobbyManager.getGameManager(roomNumber).gameData);
      console.log('---- [JOIN] ----- ', roomNumber);
    },
    out(socket) {
      const { userInfo, chattingRoom } = socket;
      if (userInfo && !!lobbyManager.getRoom(chattingRoom)) {
        notify(socket, `${userInfo.emoji} ${userInfo.name}님께서 퇴장하셨습니다.`);
				lobbyManager.getGameManager(chattingRoom).remove(userInfo.id);
				socket.leave(chattingRoom);
				lobbyManager.out(chattingRoom, userInfo);
        io.to(chattingRoom).emit(GAME_DATA, gameManager.gameData);
      }
    }
  }

  const message = (socket, msg) => {
		msg.messageId = Message.createMessageId();
		io.to(socket.chattingRoom).emit(MESSAGE, msg);
  };


  const notify = (socket, msg) => {
		const message = new Message({}, msg, MESSAGE_TYPE.NOTIFY);;
		message.messageId = Message.createMessageId();
		io.to(socket.chattingRoom).emit(MESSAGE, message);
  }

  const gameState = () => {
		io.to(socket.chattingRoom).emit(GAME_START, {});
  }

  const changeTeam = (socket, msg) => {
      gameManager.changeTeam(msg);
    io.to(socket.chattingRoom).emit(GAME_DATA, gameManager.gameData);
  }
};