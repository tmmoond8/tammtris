const userManager = require('./userManager');
const gameManager = require('./gameManager');

const MESSAGE_TYPE = {
  BROADCAST: 0,
  NOTIFY: 32
}
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
      socket.on('waitingRoom/join', () => {
        waitingRoom.join(socket);
      });

      socket.on('game/join', (response) => {
        join(socket, response);
      });

      socket.on('message', (msg) => {
        message(socket, msg);
      });

      socket.on('game/data', (response) => {
        gameData(socket, response);
      });

      socket.on('disconnect', () => {
        out(socket);
        waitingRoom.out(socket);
      });

      socket.on('game/start', () => {
        gameState();
      })

      socket.on('team/change', (msg) => {
        changeTeam(socket, msg);
      })
  });


  const gameData = (response) => {
    gameManager.put(response);
    io.sockets.emit('game/data', gameManager.gameData);
  };

  const waitingRoom = {
      join(socket, response) {
        const userInfo = userManager.addGuest();
        socket.join('waitingRoom');
        socket.join(userInfo.id);
        socket.chattingRoom = 'waitingRoom';
        io.to(userInfo.id).emit('waitingRoom/join', userInfo);
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
		io.to(socket.chattingRoom).emit('message', msg);
  };


  const notify = (socket, msg) => {
		const message = new Message({}, msg, MESSAGE_TYPE.NOTIFY);;
		message.messageId = Message.createMessageId();
		io.to(socket.chattingRoom).emit('message', message);
  }

  const gameState = () => {
		io.to(socket.chattingRoom).emit('game/start', {});
  }

  const changeTeam = (socket, msg) => {
      gameManager.changeTeam(msg);
    io.to(socket.chattingRoom).emit('game/data', gameManager.gameData);
  }
};