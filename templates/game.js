'esversion: 8';

require(__dirname + '/exceptions.js')();

class Game {
  constructor (callout, players)
  {
    this._players = players;
    this._start_time = new Date();
    this._callout = callout;
    this._state = 0; // 0 for uninitialized, Infinity for over
    this.setup();
    this.winners = undefined;
    this.losers = undefined;
  }
  async setup() {
    this._state = 1;
  }
  async step(value) {
    if (this._state == Infinity) return new Error("Game Ended!");
    return Promise.resolve();
  }
  async _check_win() {
    // Checks if a win condition has been reached
    return this._state == Infinity;
  }
  get state() {
    return this._state;
  }
  get players() {
    return this._players;
  }
  get elapsed() {
    return Date.now() - this._start_time;
  }
}
Game.gamemodes = [];


class Anagram extends Game {
  constructor (callout, players)
  {
    super(callout, players);
    this.word = Anagram.words[Math.random() * Anagram.words.length() | 0];
    this.shuffled = Anagram.shuffle(this.word);
    this.tries = 0;
  }
  async setup() {
    super.setup();
    this.start_time = this._callout('com', {message: `Unscramble: \`${this.shuffled}\``}).createdAt;
  }
  async step(reply) {
    await super.step();
    if (reply.content == this.word) {
      this._state = Infinity;
      this.winners.push(this._players[0]);
      this._callout('end', {message: `Thats right! You guessed \`${this.word}\` after ${this.tries} tries!`});
    } else {
      this.tries += 1;
      if (this.tries == Anagram.maxtries) {
        this._state = Infinity;
        this.losers.push(this._players[0]);
        this._callout('end', {message: `Sorry, the word was \`${this.word}\`.`});
      } else {
        this._callout('com', {message: `Not quite, you have ${Anagram.maxtries - this.tries} more tries.`});
      }
    }
  }
  static shuffle(word) {
    for (let i = word.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [word[i], word[j]] = [word[j], word[i]];
    }
  }
}
Anagram.words = require(__dirname+'/../resources/AnagramWords.json');
Anagram.maxtries = 6;

/* putting this on hold for now to work on a more simple game */
class BaseMinesweeper extends Game {
  constructor (players, mode="classic") {
    // ensure that we have a valid gamemode
    if (BaseMinesweeper.gamemodes.indexOf(mode) == -1) throw new Exceptions.GamemodeException("Invalid Gamemode!");
    super(players);
  }
}
BaseMinesweeper.gamemodes = ["classic"]

module.exports = function(_ref) {
  return {
    "_base_class": Game,
    "Anagram": Anagram
  }
}