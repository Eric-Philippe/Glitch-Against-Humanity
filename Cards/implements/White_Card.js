const Card = require("./Card");
const WHITE_CARD = require("../prop/WhiteCardProp");

module.exports = class White_Card extends Card {
  constructor(str) {
    super(str, WHITE_CARD);
  }
};
