class gameManager {
  constructor() {
    this.gameData = [];
  }

  find(userId) {
    let index = this.gameData.findIndex(item => userId === item.userId);
    if(index !== -1) return index;
    return this.gameData.findIndex(item => !item) === -1 ? this.gameData.length : this.gameData.findIndex(item => !item);
  }

  put({userId, gameData}) {
    const nextIndex = this.find(userId);
    this.gameData[nextIndex] = {userId, gameData};
  }

  remove({userId}) {
    this.gameData = this.gameData.filter(item => item.userId !== userId);
  }
}

module.exports = (function() {
  return new gameManager();
})() 