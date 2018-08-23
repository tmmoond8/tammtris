const emojiManager = require('../src/lib/emojiManager');
const expect = require('chai').expect;

describe('이모지 데이터 가져오는 로직 검증', () => {
  it('이모지 꺼낸 데이터 검증', () => {
    emojiManager.init();
    const INIT_EMOJI_SIZE = emojiManager.getEmojiList().length;
    const emoji = emojiManager.getEmoji();
    expect(emojiManager.getEmojiList().length).to.equal(INIT_EMOJI_SIZE - 1);
    expect(emoji.name).to.be.string;
    expect(emoji.emoji).to.be.string;
    const loop = (fn, number) => { for(let i = 0; i < number; i++) fn();}
    loop(() => emojiManager.getEmoji(), 20);
    expect(emojiManager.getEmojiList().length).to.equal(INIT_EMOJI_SIZE - 21);
    emojiManager.retrieve(emoji.name);
    expect(emojiManager.getEmojiList().length).to.equal(INIT_EMOJI_SIZE - 20);
    emojiManager.retrieve('adsadd');
    expect(emojiManager.getEmojiList().length).to.equal(INIT_EMOJI_SIZE - 20);
    loop(() => emojiManager.getEmoji(), 150);
    const pigEmoji = emojiManager.getEmoji();
    expect(pigEmoji.name).to.equal('pig nose');
  });
});