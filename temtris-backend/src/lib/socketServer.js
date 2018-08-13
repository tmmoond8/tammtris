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
          message(socket, msg);
      });

      socket.on('game_data', (response) => {
        gameData(response);
      });

      socket.on('disconnect', () => {
        out(socket);
      });

      socket.on('game_start', () => {
        gameState();
      })

      socket.on('team_change', (msg) => {
        changeTeam(msg);
      })
  });


  const gameData = (response) => {
    gameManager.put(response);
    io.sockets.emit('game_data', gameManager.gameData);
  };

  const join = (socket, response) => {
    const { userInfo, chattingRoom } = response
      socket.join(chattingRoom);
      socket.join(userInfo.id);
      console.log('---- [JOIN] ----- ', chattingRoom);
      io.sockets.emit('join', userInfo);
      gameData({ userInfo })
      socket['temtris'] = {id: userInfo.id};
  };

  const out = (socket, response) => {
    if (socket.temtris) {
        console.log('disconnet')
        console.log('---- [OUT] ----', userManager.removeUser(socket.temtris.id));
        gameManager.remove(socket.temtris.id);
        io.sockets.emit('game_data', gameManager.gameData);
    }
  }

  const message = (socket, msg) => {
      msg.messageId = Message.createMessageId();
      io.sockets.emit('message', msg);
  };


  const notify = (socket, msg, type) => {
      const message = new Message(null, msg, type);
      io.sockets.emit('notify', message);
  }

  const gameState = () => {
      io.sockets.emit('game_start', {});
  }

  const changeTeam = (msg) => {
      gameManager.changeTeam(msg);
    io.sockets.emit('game_data', gameManager.gameData);
  }
};