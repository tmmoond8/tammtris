const initEmoji = {
    monkey: { name: 'monkey', emoji: '🐵'}, 
    dog: { name: 'dog', emoji: '🐶'},
    cat: { name: 'cat', emoji: '🐱'}, 
    lion: { name: 'lion', emoji: '🦁'},
    tiger: { name: 'tiger', emoji: '🐯'}, 
    unicorn: { name: 'unicorn', emoji: '🦄'},
    cow: { name: 'cow', emoji: '🐮'}, 
    pig: { name: 'pig', emoji: '🐷'},
    boar: { name: 'boar', emoji: '🐗'}, 
    mouse: { name: 'mouse', emoji: '🐭'},
};

const emoji = {...initEmoji};
const emojiManager = {
    getEmoji() {
        const randomKey = Object.keys(emoji)[Math.floor(Math.random() * Object.keys(emoji).length)];
        const randomEmoji = emoji[randomKey];
        delete emoji[randomKey];
        return randomEmoji;
    },
    retrieve(name) {
        if(!initEmoji[name]) return;
        emoji[name] = initEmoji[name];
    }
}

module.exports = emojiManager;