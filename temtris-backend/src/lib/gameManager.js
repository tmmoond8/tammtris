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

  // 게임 들어오기 전 자리가 있는지 체킹하기 때문에 실패하지 않는다.
  put(userInfo) {
    userInfo.gameData = null;
    userInfo.gameState = GAME_STATE.READY;
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

  changeTeam({ userInfo, team }, socketEmit) {
    if(this.gameState === GAME_STATE.PLAY) return;
    const nextIndex = this.find(userInfo.id);
    this.gameData[nextIndex].team = team;
    socketEmit();
  }

  getTeam() {
    const team = {};
    this.gameData.forEach(data => {
      if(data.team === 'individual') {
        team[data.id] = data;
      } else {
        team[data.team] = team[data.team] || [];
        team[data.team].push(data);
      }
    });
    return team;
  }

  gameStart() {
    if(this.gameState === GAME_STATE.PLAY || this.getTeam().length < 2) return;
    this.gameState = GAME_STATE.PLAY;
    return true;
  }

  gameOver(userInfo) {
    // 1명 남았으면 위너로 선정.
  }

}


module.exports = gameManager;