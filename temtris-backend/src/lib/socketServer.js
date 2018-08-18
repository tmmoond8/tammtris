const userManager = require('./userManager');
const gameManager = require('./gameManager');
const roomManager = require('./roomManager');

const MESSAGE_TYPE = {
  BROADCAST: 0,
  NOTIFY: 32
}
const WAITING_ROOM = 'waitingRoom';
const MESSAGE = 'message';
const WAITING_ROOM_JOIN = 'waitingRoom/join';
const WAITING_ROOM_DATA = 'waitingRoom/data';
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
      socket.on(WAITING_ROOM_JOIN, () => {
        waitingRoom.join(socket);
      });

      socket.on(GAME_JOIN, (response) => {
        join(socket, response);
      });

      socket.on(MESSAGE, (msg) => {
        message(socket, msg);
      });

      socket.on(GAME_DATA, (response) => {
        gameData(socket, response);
      });

      socket.on('disconnect', () => {
        out(socket);
        waitingRoom.out(socket);
      });

      socket.on(GAME_START, () => {
        gameState();
      })

      socket.on(GAME_TEAM_CHANGE, (msg) => {
        changeTeam(socket, msg);
      })
  });


  const gameData = (response) => {
    gameManager.put(response);
    io.sockets.emit(GAME_DATA, gameManager.gameData);
  };

  const waitingRoom = {
		join(socket, response) {
			const userInfo = userManager.addGuest();
			socket.join(WAITING_ROOM);
			socket.join(userInfo.id);
			socket.chattingRoom = WAITING_ROOM;
			socket.userInfo = userInfo;
			io.to(socket.userInfo.id).emit(WAITING_ROOM_JOIN, userInfo);
			io.to(socket.chattingRoom).emit(WAITING_ROOM_DATA, {roomList: roomManager.getRoom(), userList: userManager.getUserList()});
			console.log(`userList : ${userManager.getUserList()}`)
			console.log(`waitingRoom : ${userInfo.name}`)
		},
		out(socket) {
			const { userInfo } = socket;
			if (userInfo) {
					console.log('---- [OUT] ----', userManager.removeUser(userInfo));
			}
		}
  }

  const join = (socket, response) => {
		const { userInfo, chattingRoom } = response;
			socket.join(chattingRoom);
			socket.chattingRoom = chattingRoom;
      notify(socket, `${userInfo.emoji} ${userInfo.name}님께서 입장하였습니다.`);
      gameData({ userInfo })
      socket.userInfo = userInfo;
      console.log('---- [JOIN] ----- ', chattingRoom);
  };

  const out = (socket, response) => {
    const { userInfo } = socket;
    if (userInfo) {
			notify(socket, `${userInfo.emoji} ${userInfo.name}님께서 퇴장하셨습니다.`);
			gameManager.remove(userInfo.id);
			io.to(socket.chattingRoom).emit('game/data', gameManager.gameData);
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