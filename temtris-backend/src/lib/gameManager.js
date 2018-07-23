class gameData {
  constructor({id, gameData}) {
    this.id = id;
    this.gameData = gameData;
  }
}

class gameManager {
  constructor() {
    this.gameData = [];
  }

  addGame({id, gameData}) {
    this.gameData.push(new gameData(id, gameData));
  }

  removeGame(id) {
    this.gameData = this.gameData.filter(item => item.id !== id);
  }
}

module.exports = (function() {
  return new gameManager();
})() 