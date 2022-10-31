const client = require("./config/client");

require("dotenv").config();

client.on("ready", () => {
  console.log(`${client.user.tag} is to fight humanity !`);
});

client.on("messageCreate", (msg) => {
  console.log(msg.content);
});

client.login(process.env.TOKEN);
