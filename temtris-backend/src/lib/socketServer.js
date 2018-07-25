const userManager = require('./userManager');

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
      socket.on('test', (msg) => {
          console.log(msg);
      });
      socket.on('disconnect', () => {
          if (socket.temtris) {
              console.log('---- [OUT] ----', userManager.removeUser(socket.temtris.id));
            //   io.sockets.emit('userList', userManager.getUserList());
          }
      });
  });

  const join = (socket, response) => {
      socket.join('openChatting');
      const newUser = userManager.addGuest(response.userId);
      socket.join(newUser.id);
      console.log('---- [JOIN] ----- ', 'openChatting', newUser.id);
      io.sockets.emit('join', newUser);
      io.sockets.emit(newUser.id, newUser);
      socket['temtris'] = {id: response.userId};
  };
  const message = (socket, msg) => {
      msg.messageId = Message.createMessageId();
      io.sockets.emit('message', msg);
      console.dir(msg);
  };

  const notify = (socket, msg, type) => {
      const message = new Message(null, msg, type);
      io.sockets.emit('notify', message);
  }
};