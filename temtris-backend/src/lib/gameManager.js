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
    userInfo.team = userInfo.team || 'individual';
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

  getTeam(gameData) {
    const team = {
      size() {
        return Object.keys(this).filter(key => key !== 'size').length
      }
    };
    gameData.forEach(data => {
      if(!data) return;
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
    if(this.gameState === GAME_STATE.PLAY || this.getTeam(this.gameData).size() < 2) return false;
    this.gameState = GAME_STATE.PLAY;
    return true;
  }

  gameOver(socketEmit) {
    const playingTeam = this.getTeam(this.gameData.filter(item => item && item.gameState !== GAME_STATE.GAME_OVER));
    if(playingTeam.size() < 2) {
      const winner = Object.keys(playingTeam).filter(key => key !== 'size');
      socketEmit(this.gameData.map(data => {
        if(!data) return data;
        return {
          ...data,
          outcome: winner === data.team ? 'VICTORY' : 'DEFEAT'
        }
      }))
      this.gameState = GAME_STATE.READY;
      this.gameData.filter(item => !!item).forEach(item => item.gameState = GAME_STATE.READY);
    }
  }
}


module.exports = gameManager;