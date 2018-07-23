// import io from 'socket.io-client';
const userManager = require('./userManager');

const MESSAGE_TYPE = {
  BROADCAST: 0,
  NOTIFY: 32
}


module.exports = function(io) {
  io.on('connection', (socket) => {
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
              io.sockets.emit('userList', userManager.getUserList());
          }
      });
  });

  const join = (socket, response) => {
      socket.join('openChatting');
      const newUser = userManager.addGuest();
      socket.join(newUser.id);
      console.log('---- [JOIN] ----- ', 'openChatting', newUser.id);
      io.sockets.emit('join', newUser);
      socket['temtris'] = {id: response.userId};
      // io.sockets.emit('cubecode-game-one', cubeCodeGameManager.getGame().boards);
      // io.sockets.emit('userList', userManager.getUserList());
      // notify(socket, newUser.name + '님이 입장 하였습니다', MESSAGE_TYPE.NOTIFY);
  };
  const message = (socket, msg) => {
      msg.messageId = Message.createMessageId();
      io.sockets.emit('message', msg);
      if (cubeCodeGameManager.getGame().collectAnswer === msg.message) {
          cubeCodeGameManager.clearGame();
          userManager.scoreUp(socket.cubecode.id);
          console.log(cubeCodeGameManager.getGame());
          io.sockets.emit('cubecode-game-one', cubeCodeGameManager.getGame().boards);
          notify(socket, `${msg.user.emoji + ' ' + msg.user.name} 님께서 정답을 맞추셨습니다. 정답은 '${msg.message}' 입니다.`, MESSAGE_TYPE.NOTIFY);
          io.sockets.emit('userList', userManager.getUserList());
      }
      console.dir(msg);
  };

  const notify = (socket, msg, type) => {
      const message = new Message(null, msg, type);
      // message.setMessageId();
      io.sockets.emit('notify', message);
  }
};