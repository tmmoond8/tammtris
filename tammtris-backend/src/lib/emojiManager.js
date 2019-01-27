const initEmoji = {
    monkey: { name: 'monkey', emoji: '🐵'}, 
    dog: { name: 'dog', emoji: '🐶'},
    cat: { name: 'cat', emoji: '🐱'}, 
    lion: { name: 'dragon', emoji: '🐲'},
    tiger: { name: 'tiger', emoji: '🐯'}, 
    unicorn: { name: 'frog', emoji: '🐸'},
    cow: { name: 'cow', emoji: '🐮'}, 
    pig: { name: 'pig', emoji: '🐷'},
    boar: { name: 'boar', emoji: '🐗'}, 
    mouse: { name: 'mouse', emoji: '🐭'},
    snake: { name: 'snake', emoji: '🐍'},
    turtle: { name: 'turtle', emoji: '🐢'},
    penguin: { name: 'penguin', emoji: '🐧'},
    bird: { name: 'bird', emoji: '🐦'},
    chick: { name: 'chick', emoji: '🐤'},
    bear: { name: 'bear', emoji: '🐻'},
    panda: { name: 'panda', emoji: '🐼'},
    chicken: { name: 'chicken', emoji: '🐔'},
    koala: { name: 'koala', emoji: '🐨'},
    whale: { name: 'whale', emoji: '🐳'},
    dolphin: { name: 'dolphin', emoji: '🐬'},
    fish: { name: 'fish', emoji: '🐠'},
    blowfish: { name: 'blowfish', emoji: '🐡'},
    octopus: { name: 'octopus', emoji: '🐙'},
    spiral: { name: 'spiral', emoji: '🐚'},
    bug: { name: 'bug', emoji: '🐛'},
    ant: { name: 'ant', emoji: '🐜'},
    bee: { name: 'bee', emoji: '🐝'},
    snowman: { name: 'snowman', emoji: '⛄'},
};

let emoji = {...initEmoji};
const emojiManager = {
    getEmoji() {
        if(Object.keys(emoji).length === 0) return {name: 'pig nose', emoji: '🐽'}
        const randomKey = Object.keys(emoji)[Math.floor(Math.random() * Object.keys(emoji).length)];
        const randomEmoji = emoji[randomKey];
        delete emoji[randomKey];
        return randomEmoji;
    },
    retrieve(name) {
        if(!initEmoji[name]) return;
        emoji[name] = initEmoji[name];
    },
    getEmojiList() {
        return Object.keys(emoji).map(key => emoji[key]);
    },
    init() {
        emoji = { ...initEmoji };
    }
}

module.exports = emojiManager;