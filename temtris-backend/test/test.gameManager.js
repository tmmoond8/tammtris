const userManager = require('../src/lib/userManager');
const gameManager = require('../src/lib/gameManager');
const { GAME_STATE} = require('../src/lib/variable');
const expect = require('chai').expect;
userManager.init();
const userDataSet = 'a'.repeat(10).split('a').map(() => userManager.addGuest());
let user;

describe('게임 만들어서 실행시키고 종료하기', () => {

  beforeEach(function() {
    user = userDataSet.map(item => ({ ...item}));
  })

  it('유저 생성, 제거', () => {
    console.log('유저 생성, 제거');
    const game = new gameManager();
    expect(game.find(user[0].id)).to.equal(0);
    expect(game.getPlayerList().length).to.equal(0);

    game.put(user[0]);
    game.put(user[1]);
    game.put(user[2]);
    game.put(user[3]);

    expect(game.getPlayerList().length).to.equal(4);
    expect(game.find(user[1].id)).to.equal(1);
    expect(game.find(user[3].id)).to.equal(3);
    expect(game.find('aaa')).to.equal(4);
    expect(game.isFull()).to.be.false;

    game.put(user[4]);
    game.put(user[5]);
    expect(game.isFull()).to.be.true;
    expect(game.find('nonono')).to.equal(-1);
    game.put(user[7]);
    expect(game.gameData[2].id).to.equal(user[2].id);
    expect(game.getPlayerList().length).to.equal(6);
    game.remove(user[3].id);
    expect(game.getPlayerList().length).to.equal(5);
    game.remove(user[5].id);
    expect(game.getPlayerList().length).to.equal(4);
    game.remove(user[3].id);
    expect(game.getPlayerList().length).to.equal(4);
    expect(game.find('vcxvzzxvc')).to.equal(3);
    game.put(user[6]);
    expect(game.gameData[3].id).to.equal(user[6].id);
  });


  it('게임 시작 로직 검증', () => {
    const game = new gameManager();
    expect(game.gameStart()).to.be.false // 플레이어가 혼자라서 게임을 시작하지 않는다.
    game.put(user[0]);
    game.put(user[1]);
    expect(game.gameStart()).to.be.true
    expect(game.gameStart()).to.be.false
    game.gameState = GAME_STATE.READY;
  });

  it('팀 바꾸기', () => {
    const game = new gameManager()
    game.put(user[0]);
    game.put(user[1]);
    expect(game.gameData[1].team).to.equal('individual');
    game.changeTeam(user[1], 'red', () => {});
    expect(game.gameData[1].team).to.equal('red');
    game.gameStart();
    game.changeTeam(user[1], 'blue', () => {}); // 게임이 시작되면 팀을 바꿀수 없다.
    expect(game.gameData[1].team).to.equal('red');
  });

  it('팀 사이즈 함수 검증', () => {
    const game = new gameManager();
    game.put(user[0]);
    game.put(user[1]);
    game.put(user[2]);
    game.put(user[3]);
    expect(game.getTeam(game.gameData).size()).to.equal(4);
    game.put({ ...user[2], team: 'red'})
    expect(game.getTeam(game.gameData).size()).to.equal(4);
    game.put({ ...user[1], team: 'blue'})
    expect(game.getTeam(game.gameData).size()).to.equal(4);
    game.put({ ...user[1], team: 'green'})
    expect(game.getTeam(game.gameData).size()).to.equal(4);
    game.put({ ...user[0], team: 'green'})
    expect(game.getTeam(game.gameData).size()).to.equal(3);
    game.put({ ...user[3], team: 'blue'})
    expect(game.getTeam(game.gameData).size()).to.equal(3);
    game.put({ ...user[3], team: 'red'})
    expect(game.getTeam(game.gameData).size()).to.equal(2);
  })

  it('게임 오버 검증 - 개인전', () => {
    // 개인 4명이서 게임을 할 경우
    const game = new gameManager();
    game.put(user[0]);
    game.put(user[1]);
    game.put(user[2]);
    game.put(user[3]);
    game.gameStart();
    expect(game.gameState).to.equal(GAME_STATE.PLAY);
    
    game.gameOver(user[0], () => {});
    expect(game.gameState).to.equal(GAME_STATE.PLAY);
    
    game.gameOver(user[1], () => {});
    expect(game.gameState).to.equal(GAME_STATE.PLAY);
    
    game.gameOver(user[3], () => {});
    expect(game.gameState).to.equal(GAME_STATE.READY);
  })

  it('게임 오버 검증 - 팀전', () => {
    // 6명이서 3:3 게임을 할 경우
    const game = new gameManager();
    game.put(user[0]);
    game.put(user[1]);
    game.put(user[2]);
    game.put(user[3]);
    game.put(user[4]);
    game.put(user[5]);
    game.changeTeam(user[0], 'red', () => {});
    game.changeTeam(user[1], 'green', () => {});
    game.changeTeam(user[2], 'red', () => {});
    game.changeTeam(user[3], 'green', () => {});
    game.changeTeam(user[4], 'red', () => {});
    game.changeTeam(user[5], 'green', () => {});
    game.gameStart();
    expect(game.gameState).to.equal(GAME_STATE.PLAY);

    // game.put({ ...user[0], gameState: GAME_STATE.GAME_OVER });
    // game.put({ ...user[1], gameState: GAME_STATE.GAME_OVER });
    game.gameOver(user[0], () => {});
    game.gameOver(user[1], () => {});
    expect(game.gameState).to.equal(GAME_STATE.PLAY);
    
    // game.put({ ...user[3], gameState: GAME_STATE.GAME_OVER });
    game.gameOver(user[3], () => {});
    expect(game.gameState).to.equal(GAME_STATE.PLAY);
    
    // game.put({ ...user[5], gameState: GAME_STATE.GAME_OVER });
    game.gameOver(user[5], () => {});
    expect(game.gameState).to.equal(GAME_STATE.READY);
  })

  it('게임 오버 검증 - 복합', () => {
    // 6명이서 3:3 게임을 할 경우
    const game = new gameManager();
    game.put(user[0]);
    game.put(user[1]);
    game.put(user[2]);
    game.put(user[3]);
    game.put(user[4]);
    game.put(user[5]);
    game.changeTeam(user[1], 'green', () => {});
    game.changeTeam(user[2], 'red', () => {});
    game.changeTeam(user[3], 'green', () => {});
    game.changeTeam(user[4], 'red', () => {});
    game.changeTeam(user[5], 'green', () => {});
    game.gameStart();
    expect(game.gameState).to.equal(GAME_STATE.PLAY);
    
    game.gameOver(user[4], () => {});
    game.gameOver(user[1], () => {});
    expect(game.gameState).to.equal(GAME_STATE.PLAY);

    game.gameOver(user[3], () => {});
    expect(game.gameState).to.equal(GAME_STATE.PLAY);
    
    game.gameOver(user[2], () => {});
    expect(game.gameState).to.equal(GAME_STATE.PLAY);

    game.gameOver(user[5], () => {});
    expect(game.gameState).to.equal(GAME_STATE.READY);
  })
})
