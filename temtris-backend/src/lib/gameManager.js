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
  
  getPlayer(userId) {
    let index = this.gameData.findIndex(user => user && user.id === userId);
    if (index === -1) return null;
    return this.gameData[index];
  }

  // 게임 들어오기 전 자리가 있는지 체킹하기 때문에 실패하지 않는다.
  put(userInfo) {
    userInfo.team = userInfo.team || 'individual';
    const nextIndex = this.find(userInfo.id);
    this.gameData[nextIndex] = userInfo;
  }

  // 유저의 게임 데이터만 업데이트 한다.
  updateGameData({id, gameState, gameData, gameItems}) {
    const player = this.getPlayer(id);
    if (player === null) return;
    player.gameState = gameState;
    player.gameData = gameData;
    player.gameItems = gameItems;
  }

  isFull() {
    return this.gameData.filter(user => user).length === 6;
  }

  remove(userInfo) {
    if(!userInfo) return;
    const { id } = userInfo;
    this.gameData = this.gameData.map(user => {
      return (user && user.id !== id) ? user : null
    });
  }

  changeTeam({id}, team , socketEmit) {
    if(this.gameState === GAME_STATE.PLAY) return;
    const player = this.getPlayer(id);
    if (player === null) return;
    player.team = team;
    socketEmit();
  }

  getTeam(gameData) {
    const team = new Map();
    gameData.forEach(data => {
      if (!data) return data;
      if (data.team === 'individual') {
        team.set(data.id, data);
      } else {
        team.has(data.team) ? team.get(data.team).push(data) : team.set(data.team, [data]);
      }
    });
    return team;
  }

  gameStart() {
    if(this.gameState === GAME_STATE.PLAY || this.getTeam(this.gameData).size < 2) return false;
    this.gameState = GAME_STATE.PLAY;
    this.gameData.filter(item => !!item).forEach(item => {
      item.gameState = GAME_STATE.PLAY;
      item.gameData = null;
    });

    return true;
  }

  gameOver(userInfo, socketEmit) {
    if(!userInfo) return;
    const { id } = userInfo;
    const player = this.getPlayer(id);
    player.gameState = GAME_STATE.GAME_OVER;
    const playingTeam = this.getTeam(this.gameData.filter(item => item && item.gameState === GAME_STATE.PLAY));
    if(playingTeam.size < 2) {
      this.gameState = GAME_STATE.READY;
      if(playingTeam.size === 0) return;
      const winner = playingTeam.keys().next().value;
      const gameResult = this.gameData.reduce((accum, data) => {
        if(!data) return accum;
        data.gameState = GAME_STATE.READY;
        accum.push({
          ...data,
          gameResult: (data.team === winner || data.id === winner)  ? 'VICTORY' : 'DEFEAT'
        });
        return accum;
      }, []);
      socketEmit(gameResult);
    }
  }

  itemUse({ from, to }, socketEmit) {
    console.log(`from : ${from} to : ${to}`);
    socketEmit()
  }
}


module.exports = gameManager;