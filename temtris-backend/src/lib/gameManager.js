class gameManager {
  constructor() {
    this.gameData = [];
  }

  find(userId) {
    let index = this.gameData.findIndex(item => !!item && item.userInfo && userId === item.userInfo.id);
    if(index !== -1) return index;
    return this.gameData.findIndex(item => !item) === -1 ? this.gameData.length : this.gameData.findIndex(item => !item);
  }

  put({userInfo, gameData}) {
    const nextIndex = this.find(userInfo.id);
    this.gameData[nextIndex] = {userInfo, gameData};
  }

  remove(userId) {
    this.gameData = this.gameData.map(item => {
      return item && item.userInfo.id !== userId ? item: null
    });
  }
}

module.exports = (function() {
  return new gameManager();
})() 