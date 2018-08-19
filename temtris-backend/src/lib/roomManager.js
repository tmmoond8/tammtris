const userManager = require('./userManager');

const GAME_STATE = {
    READY: 'READY',
    PLAY: 'PLAY',
    GAME_OVER: 'GAME_OVER'
  }

class Room {
    constructor(title) {
        this.title = title;
        this.host = null;
        this.state = GAME_STATE.READY;
        this.players = [];
    }
}
const roomList = [
    new Room('winter is comming'),
    new Room('ours is the fury'),
    new Room('here me roar'),
    new Room('fire and blood'),
    new Room('family duty honor'),
    new Room('we do not sow')
];
let waitingUserList = [];
const roomManager = {
    getRoom() {
        return roomList;
    },
    join(index, userInfo) {
        if(roomList[index].players.length === 6) return null;
        roomList[index].players.push(userInfo);
        return roomList;
    },
    out(index, userInfo) {
        roomList[index].players = roomList[index].players.filter(item => item.id !== userInfo.id);
        return roomList;
    },
    getWaitingUserList() {
        return waitingUserList;
    },
    addWaitingUser(user) {
        waitingUserList.push(user);
    },
    removeWaitingUser(user) {
        waitingUserList = waitingUserList.filter(item => item.id !== user.id);
    }
};

module.exports = roomManager;

// const user = userManager.addGuest();
// console.log(roomManager.getWaitingUserList());
// roomManager.addWaitingUser(user);
// roomManager.addWaitingUser(userManager.addGuest());
// roomManager.addWaitingUser(userManager.addGuest());
// console.log(roomManager.getWaitingUserList());
// roomManager.removeWaitingUser(user);
// console.log(roomManager.getWaitingUserList());

// console.log(roomManager.getRoom())
// console.log(roomManager.join(0, userManager.addGuest()))
// console.log(roomManager.join(0, userManager.addGuest()))
// console.log(roomManager.join(0, userManager.addGuest()))
// console.log(roomManager.join(0, userManager.addGuest()))
// console.log(roomManager.join(0, userManager.addGuest()))
// console.log(roomManager.join(0, userManager.addGuest()))
// console.log(roomManager.join(0, userManager.addGuest()))
// console.log(roomManager.join(0, userManager.addGuest()))
// console.log(roomManager.join(1, userManager.addGuest()))
// console.log(roomManager.join(2, userManager.addGuest()))
// console.log(roomManager.out(2, userManager.addGuest()))
// console.log(roomManager.out(2, roomManager.getRoom()[2].players[0]))
