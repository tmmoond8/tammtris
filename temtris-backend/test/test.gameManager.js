const userManager = require('../src/lib/userManager');
const gameManager = require('../src/lib/gameManager');
const expect = require('chai').expect;
userManager.init();
const userDataSet = 'a'.repeat(10).split('a').map(() => userManager.addGuest());
let user;

describe('게임 만들어서 실행시키고 종료하기', () => {

  beforeEach(function() {
    user = [...userDataSet];
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
    console.log('게임 시작 로직 검증');
    const game = new gameManager();
    expect(game.gameStart()).to.be.false // 플레이어가 혼자라서 게임을 시작하지 않는다.
    game.put(user[0]);
    game.put(user[1]);
    expect(game.gameStart()).to.be.true
    expect(game.gameStart()).to.be.false
  });

  it('팀 바꾸기', () => {
    const game = new gameManager()
    game.put(user[0]);
    game.put(user[1]);
    expect(game.gameData[1].team).to.equal('individual');
    game.changeTeam({ userInfo: user[1], team: 'red' });
    expect(game.gameData[1].team).to.equal('red');
    game.gameStart();
    game.changeTeam({ userInfo: user[1], team: 'blue' }); // 게임이 시작되면 팀을 바꿀수 없다.
    expect(game.gameData[1].team).to.equal('red');
  });
})
