const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome!"));
bot.help((ctx) => ctx.reply("Send me a message and I'll echo it."));
bot.command("balance", (ctx) => {
  const message = ctx.message.text.split(" ").slice(1).join(" ");
  if (message) {
    ctx.reply(`${message} wallet balance is Rp`);
  } else {
    ctx.reply("Usage: /balance <your wallet name>");
  }
});

bot.use(async (ctx, next) => {
  console.log("Received update:", ctx.update);
  return next();
});

module.exports = bot;
