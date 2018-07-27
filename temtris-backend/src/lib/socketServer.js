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
      console.log('---------------[OUT] ----- socket ON')
      socket.on('join', (response) => {
          join(socket, response);
      });

      socket.on('message', (msg) => {
          message(socket, msg);
      });

      socket.on('gameData', (response) => {
        gameData(response);

      });
      socket.on('disconnect', () => {
          if (socket.temtris) {
              console.log('---- [OUT] ----', userManager.removeUser(socket.temtris.id));
            //   io.sockets.emit('userList', userManager.getUserList());
          }
      });
  });

  const join = (socket, response) => {
    const { userInfo, chattingRoom } = response
      socket.join(chattingRoom);
      socket.join(userInfo.id);
      console.log('---- [JOIN] ----- ', chattingRoom, userInfo.id);
      io.sockets.emit('join', userInfo);
      socket['temtris'] = {id: userInfo.id};
  };
  const message = (socket, msg) => {
      msg.messageId = Message.createMessageId();
      io.sockets.emit('message', msg);
  };

  const gameData = (response) => {
    gameManager.put(response);
    io.sockets.emit('gameData', gameManager.gameData);
  };

  const notify = (socket, msg, type) => {
      const message = new Message(null, msg, type);
      io.sockets.emit('notify', message);
  }
};