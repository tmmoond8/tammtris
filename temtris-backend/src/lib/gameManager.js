class gameManager {
  constructor() {
    this.gameData = 'a'.repeat(5).split('a').map(() => null);
  }

  getPlayerList() {
    return this.gameData.filter(user => !!user);
  }

  find(userId) {
    let index = this.gameData.findIndex(user => user && user.id === userId);
    if(index !== -1) return index;
    return this.gameData.findIndex(user => !user) === -1 ? this.gameData.length : this.gameData.findIndex(user => !user);
  }

  put(userInfo) {
    const nextIndex = this.find(userInfo.id);
    this.gameData[nextIndex] = userInfo;
  }

  isFull() {
    return this.gameData.filter(user => user).length === 6;
  }

  remove(userId) {
    this.gameData = this.gameData.map(user => {
      return user && user.id !== userId ? user : null
    });
  }

  changeTeam({ userInfo, team }) {
    const nextIndex = this.find(userInfo.id);
    this.gameData[nextIndex].userInfo.team = team;
  }
}

module.exports = gameManager;