class gameManager {
  constructor() {
    this.gameData = 'a'.repeat(5).split('a').map(() => null);
  }

  find(userId) {
    let index = this.gameData.findIndex(item => !!item && item.userInfo && userId === item.userInfo.id);
    if(index !== -1) return index;
    return this.gameData.findIndex(item => !item) === -1 ? this.gameData.length : this.gameData.findIndex(item => !item);
  }

  put({userInfo, gameData, gameState}) {
    const nextIndex = this.find(userInfo.id);
    this.gameData[nextIndex] = {userInfo, gameData, gameState};
  }

  isFull() {
    return this.gameData.filter(item => !!item.userInfo).length === 6;
  }

  remove(userId) {
    this.gameData = this.gameData.map(item => {
      return item && item.userInfo.id !== userId ? item: null
    });
  }

  changeTeam({ userInfo, team }) {
    const nextIndex = this.find(userInfo.id);
    this.gameData[nextIndex].userInfo.team = team;
  }
}

module.exports = gameManager;