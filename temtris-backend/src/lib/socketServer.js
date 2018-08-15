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
      socket.on('join', (response) => {
          join(socket, response);
      });

      socket.on('message', (msg) => {
          message(msg);
      });

      socket.on('game/data', (response) => {
        gameData(response);
      });

      socket.on('disconnect', () => {
        out(socket);
      });

      socket.on('game/start', () => {
        gameState();
      })

      socket.on('team/change', (msg) => {
        changeTeam(msg);
      })
  });


  const gameData = (response) => {
    gameManager.put(response);
    io.sockets.emit('game/data', gameManager.gameData);
  };

  const join = (socket, response) => {
    const { userInfo, chattingRoom } = response
      socket.join(chattingRoom);
      socket.join(userInfo.id);
      notify(`${userInfo.emoji} ${userInfo.name}님께서 입장하였습니다.`);
      console.log('---- [JOIN] ----- ', chattingRoom);
      io.sockets.emit('join', userInfo);
      gameData({ userInfo })
      socket.userInfo = userInfo;
  };

  const out = (socket, response) => {
    const { userInfo } = socket;
    if (userInfo) {
        console.log('disconnet')
        console.log('---- [OUT] ----', userManager.removeUser(userInfo));
        notify(`${userInfo.emoji} ${userInfo.name}님께서 퇴장하셨습니다.`);
        gameManager.remove(userInfo.id);
        io.sockets.emit('game/data', gameManager.gameData);
    }
  }

  const message = (msg) => {
      msg.messageId = Message.createMessageId();
      io.sockets.emit('message', msg);
  };


  const notify = (msg) => {
      const message = new Message({}, msg, MESSAGE_TYPE.NOTIFY);;
      message.messageId = Message.createMessageId();
      io.sockets.emit('message', message);
  }

  const gameState = () => {
      io.sockets.emit('game/start', {});
  }

  const changeTeam = (msg) => {
      gameManager.changeTeam(msg);
    io.sockets.emit('game/data', gameManager.gameData);
  }
};