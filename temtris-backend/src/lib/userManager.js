const uuid = require('uuid/v1');
const emojiManager = require('./emojiManager');

class User {
  constructor(name, emoji) {
    this.id = uuid();
    this.name = name;
    this.emoji = emoji;
    this.team = 'individual';
  }
}

class UserManager {
  constructor() {
    this.userList = [];
  }

  addUser({name, emoji}) {
    this.userList.push(new user(id, name, emoji));
  }

  addGuest(id) {
    const emoji = emojiManager.getEmoji();
    const user = new User(emoji.name, emoji.emoji);
    this.userList.push(user);
    return user;
  }

  removeUser(userInfo) {
    emojiManager.retrieve(userInfo.name);
    this.userList = this.userList.filter(item => item.id !== userInfo.id);
    return userInfo.name;
  }
}

module.exports = (function () {
  return new UserManager();
})();