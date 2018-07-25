import io from 'socket.io-client';

let socket = io('http://localhost:8080');
// console.log('socket io client', Config.socketClient.baseURL);
socket.on('connect', () => {
    console.log('socket connect');
});
socket.on('disconnect', () => {
    console.log('socket disconnect');
});

const MESSAGE_TYPE = {
    BROADCAST : 0,
    NOTIFY : 32,
};

let SocketClient = {
    sendMessage: (event, message) => {
        socket.emit(event, message);
    },
    addEventOn: (event, fn) => {
        socket.on(event, (msg) => {
            fn(msg);
        })
    },
}

class Message {
    constructor(user, message) {
        this.user = user;
        this.message = message || '';
        this.type = MESSAGE_TYPE.BROADCAST;
    }

    static createMessageId = () => {
        const toDay = new Date().toISOString()
        //.replace(/-/g,"").replace(/t/gi, "").replace(/:/g, "");
        console.log(toDay);
        return toDay// + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
}

export default SocketClient;
export {Message};
export {MESSAGE_TYPE};