const uuid = require('uuid/v1');

const Emoji = {
  monkey: { name: 'monkey', emoji: '🐵'}, dog: { name: 'dog', emoji: '🐶'},
  cat: { name: 'cat', emoji: '🐱'}, lion: { name: 'lion', emoji: '🦁'},
  tiger: { name: 'tiger', emoji: '🐯'}, unicorn: { name: 'unicorn', emoji: '🦄'},
  cow: { name: 'cow', emoji: '🐮'}, pig: { name: 'pig', emoji: '🐷'},
  boar: { name: 'boar', emoji: '🐗'}, mouse: { name: 'mouse', emoji: '🐭'},
}

class User {
  constructor(name, emoji) {
    this.id = uuid();
    this.name = name;
    this.emoji = emoji;
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
    const emoji = Emoji[Object.keys(Emoji)[Math.floor(Math.random() * Object.keys(Emoji).length)]];
    const user = new User(emoji.name, emoji.emoji);
    this.userList.push(user);
    return user;
  }

  removeUser(id) {
    this.userList = this.userList.filter(item => item.id !== id);
  }
}

module.exports = (function () {
  return new UserManager();
})();