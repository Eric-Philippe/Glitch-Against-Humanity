const Card = require("../interfaces/Card");
const PURPLE_CARD = require("../prop/PurpleCardProp");

module.exports = class Black_Card extends Card {
  constructor(str, nbToFill) {
    super(str, PURPLE_CARD);
    /**
     * The Formated text of the card
     * @type {String}
     */
    this.text = Black_Card.formatUnderscore(str);
    /**
     * Says if the card is an open question or a fill in the blank
     * @type {Boolean}
     */
    this.fillInBlank = str.includes("_");
    /**
     * The number of answers the card needs to be filled
     * @type {Number}
     */
    this.nbToFill = nbToFill;
    /**
     * The Place of the answers in the text
     * @type {Array}
     */
    this.answersPlace = this.fillInBlank ? this.getAnswersPlace(str) : [];
  }
  /**
   * Returns the text of the card with underscore multiplied by six
   * @param {String} str
   * @returns {String}
   */
  static formatUnderscore(str) {
    return str.replace(/_/g, "______");
  }
  /**
   * Returns the place of the answers in the text
   * @param {String} str
   * @returns {Array}
   */
  getAnswersPlace(str) {
    const answersPlace = [];
    const regex = /_/g;
    let match;
    while ((match = regex.exec(str))) {
      answersPlace.push(match.index);
    }
    return answersPlace;
  }
  /**
   * Replace the underscores by the answers
   * @param {Array} answers
   * @returns {String}
   */
  fill(answers) {
    if (answers.length !== this.nbToFill) {
      throw new Error(
        "The number of answers is not the same as the number of blanks"
      );
    }
    let text = this.text;
    for (let i = 0; i < answers.length; i++) {
      text =
        text.slice(0, this.answersPlace[i]) +
        answers[i] +
        text.slice(this.answersPlace[i] + 6);
    }
    return text;
  }
};
