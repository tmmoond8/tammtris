const gameManager = require('./gameManager');

const GAME_STATE = {
    READY: 'READY',
    PLAY: 'PLAY',
    GAME_OVER: 'GAME_OVER'
  }

class Room {
    constructor(title, number) {
        this.title = title;
        this.number = number;
        this.host = null;
        this.state = GAME_STATE.READY;
				this.gameManager = new gameManager();
    }
}

let roomList = {};
let roomKey = 1;
let waitingUserList = [];

const roomManager = {
    getRoomList() {
        return roomList;
		},
		
		createRoom(title) {
			roomList[roomKey] = new Room(title, roomKey++);
		},

    join(index, userInfo) {
			userInfo.gameData = null;
			if(roomList[index].gameManager.isFull()) return null;
			roomList[index].gameManager.put(userInfo, null);
			return roomList[index];
    },
    out(index, userInfo) {
			if(!roomList[index]) return;
			roomList[index].gameManager.remove(userInfo);
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

roomManager.createRoom('winter is comming');
roomManager.createRoom('ours is the fury');
roomManager.createRoom('here me roar');
roomManager.createRoom('fire and blood');
roomManager.createRoom('family duty honor');
roomManager.createRoom('we do not sow');

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
