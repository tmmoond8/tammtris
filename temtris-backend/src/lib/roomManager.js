const userManager = require('./userManager');

const room = [
    {
        title: 'winter is comming',
        players: []
    },
    {
        title: 'ours is the fury',
        players: []
    },
    {
        title: 'here me roar',
        players: []
    },
    {
        title: 'fire and blood',
        players: []
    },
    {
        title: 'family duty honor',
        players: []
    },
    {
        title: 'we do not sow',
        players: []
    }
];
const roomManager = {
    getRoom() {
        return room;
    },
    join(index, userInfo) {
        if(room[index].players.length === 6) return;
        room[index].players.push(userInfo);
        return room;
    },
    out(index, userInfo) {
        room[index].players = room[index].players.filter(item => item.id !== userInfo.id);
        return room;
    }
};

module.exports = roomManager;

// module.exports = roomManager;
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
