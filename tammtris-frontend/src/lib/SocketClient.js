import io from 'socket.io-client';

const serverUrl = window.location.origin.replace('14100', '14200');
let socket = io(serverUrl);

const MESSAGE_TYPE = {
    BROADCAST : 0,
    NOTIFY : 32,
};

const SocketClient = {
    sendMessage: (event, message) => {
        socket.emit(event, message);
    },
    addEventOn: (event, fn) => {
        socket.on(event, (msg) => {
            fn(msg);
        })
    },
    socket
}

class Message {
    constructor(user, message) {
        this.user = user;
        this.message = message || '';
        this.type = MESSAGE_TYPE.BROADCAST;
    }

    static createMessageId = () => {
        const toDay = new Date().toISOString()
        return toDay// + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
}

export default SocketClient;
export {Message};
export {MESSAGE_TYPE};