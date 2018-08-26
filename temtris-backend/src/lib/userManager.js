const uuid = require('uuid/v1');
const emojiManager = require('./emojiManager');

class User {
  constructor({name, emoji}) {
    this.id = uuid();
    this.name = name;
    this.emoji = emoji;
  }
}
let userList = [];
class UserManager {
  addUser({name, emoji}) {
    userList.push(new user(name, emoji));
  }

  addGuest() {
    const emoji = emojiManager.getEmoji();
    const user = new User(emoji);
    userList.push(user);
    return user;
  }

  removeUser(userInfo) {
    emojiManager.retrieve(userInfo.name);
    userList = userList.filter(item => item.id !== userInfo.id);
    return userInfo.name;
  }

  getUserList() {
    return userList;
  }

  init() {
    emojiManager.init();
    userList = [];
  }
}

module.exports = (function () {
  return new UserManager();
})();