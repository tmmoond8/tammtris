const userManager = require('./userManager');

const room = [
    {
        title: 'winter is comming',
        players: []
    },
    {
        title: 'test2',
        players: []
    },
    {
        title: 'test3',
        players: []
    },
    {
        title: 'test4',
        players: []
    },
    {
        title: 'test5',
        players: []
    },
    {
        title: 'test5',
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
