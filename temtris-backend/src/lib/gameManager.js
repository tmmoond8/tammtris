const { GAME_STATE } = require('./variable');

class gameManager {
  constructor(title, gameNumber) {
		this.title = title;
		this.gameNumber = gameNumber;
		this.host = null;
		this.gameState = GAME_STATE.READY;
    this.gameData = 'a'.repeat(5).split('a').map(() => null);
  }

  getPlayerList() {
    return this.gameData.filter(user => !!user);
  }

  find(userId) {
    let index = this.gameData.findIndex(user => user && user.id === userId);
    if(index !== -1) return index;
    return this.gameData.findIndex(user => !user);
  }

  put(userInfo) {
    const nextIndex = this.find(userInfo.id);
    if(nextIndex === -1) return;
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
    if(this.gameState === GAME_STATE.PLAY) return false;
    const nextIndex = this.find(userInfo.id);
    this.gameData[nextIndex].team = team;
    return true;
  }

  gameStart() {
    if(this.gameState === GAME_STATE.PLAY || this.getPlayerList().length < 2 ) return false;
    this.gameState = GAME_STATE.PLAY;
    return true;
  }

  gameOver(userInfo) {
    // 1명 남았으면 위너로 선정.
  }

}


module.exports = gameManager;