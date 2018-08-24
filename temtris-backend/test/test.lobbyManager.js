const lobbyManager = require('../src/lib/lobbyManager');
const userManager = require('../src/lib/userManager');
const expect = require('chai').expect;
userManager.init();
const userDataSet = 'a'.repeat(10).split('a').map(() => userManager.addGuest());

describe('lobbyManager TEST', () => {
  it('방이 잘 생성되었는지 검증', () => {
    let lobbyData = lobbyManager.getLobbyData();
    expect(lobbyData.gameList.length).to.equal(6);
    expect(lobbyData.gameList[3].players.length).to.equal(0);
    expect(lobbyManager.getGameManager(2).title).to.equal('ours is the fury')
    expect(lobbyManager.getGameManager(2).gameNumber).to.equal(2);
  });

  it('플레이어 방에 입장 시키기', () => {
    const user = [...userDataSet];
    lobbyManager.lobbyJoin(user[0]);
    lobbyManager.lobbyJoin(user[1]);
    lobbyManager.lobbyJoin(user[2]);
    lobbyManager.lobbyJoin(user[3]);
    expect(lobbyManager.getWaitingUserList().length).to.equal(4);
    lobbyManager.lobbyOut(user[3]);
    lobbyManager.lobbyOut(user[6]);
    expect(lobbyManager.getWaitingUserList().length).to.equal(3);
  });

  it('gameCheck 함수 검증', () => {
    const user = [...userDataSet];
    lobbyManager.gameCheck(2, user[0], () => {});
    lobbyManager.gameCheck(2, user[1], () => {});
    lobbyManager.gameCheck(3, user[2], () => {});
    lobbyManager.gameCheck(4, user[3], () => {});
    expect(lobbyManager.getGameManager(2).getPlayerList().length).to.equal(2);
    expect(lobbyManager.getGameManager(3).getPlayerList().length).to.equal(1);
    expect(lobbyManager.getGameManager(4).getPlayerList().length).to.equal(1);
    lobbyManager.gameCheck(2, user[4], () => {});
    lobbyManager.gameCheck(2, user[5], () => {});
    lobbyManager.gameCheck(2, user[6], () => {});
    lobbyManager.gameCheck(2, user[7], () => {});
    expect(lobbyManager.getGameManager(2).getPlayerList().length).to.equal(6);
    expect(lobbyManager.gameCheck(2, user[8], () => {})).to.be.null;
  });
})