const { AttachementBuilder, Attachement } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
/**
 * @typedef {Object} CardTemplateProperties
 * @property {String} imgPath the path of the image
 * @property {Number} xTop the x position of the top left corner of the image
 * @property {Number} yTop the y position of the top left corner of the image
 * @property {Number} width the width space to write in
 * @property {Number} height the height space to write in
 */
module.exports = class Card {
  /**
   *
   * @param {String} str
   * @param {CardTemplateProperties} cardTemplateProperties
   */
  constructor(str, cardTemplateProperties) {
    /**
     * The text of the card
     * @type {String}
     */
    this.text = str;
    /**
     * The Properties of the image template
     * @type {CardTemplateProperties}
     */
    this.cardProp = cardTemplateProperties;
  }
  /**
   * Returns the text of the card
   * @returns {String}
   * @memberof Card
   */
  getText() {
    return this.text;
  }
  /**
   * Draw the card on the canvas and returns an Attachment
   * @returns {Attachement}
   * @memberof Card
   */
  async draw(str) {
    let myTxt = str || this.text;
    const canvas = Canvas.createCanvas(500, 500);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(this.cardProp.imgPath);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // Calculate the size of the text
    ctx.font = "30px sans-serif";
    const textWidth = ctx.measureText(myTxt).width;
    const textHeight = ctx.measureText("M").width;
    // Display the text on the free space
    ctx.fillStyle = "#000000";
    ctx.fillText(
      myTxt,
      this.cardProp.xTop + (this.cardProp.width - textWidth) / 2,
      this.cardProp.yTop + (this.cardProp.height - textHeight) / 2
    );
    const attachment = new AttachementBuilder(canvas.toBuffer());
    return attachment;
  }
};
