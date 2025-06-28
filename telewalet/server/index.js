const express = require("express");
require("dotenv").config();
const bot = require("../bot");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (_, res) => {
  res.send("Bot is running");
});

app.post("/delete-webhook", async (_, res) => {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/deleteWebhook`
    );
    res.json({
      status: "success",
      data: response.data,
    });
  } catch (err) {
    console.error(
      "Failed to delete webhook:",
      err.response?.data || err.message
    );
    res.status(500).json({
      status: "error",
      message: err.response?.data || err.message,
    });
  }
});

app.listen(PORT, async () => {
  console.log(`Express server running on port ${PORT}`);
  try {
    await bot.launch(); // <--- Launch the bot here!
    console.log("Bot started via polling");
  } catch (err) {
    console.error("Bot failed to launch:", err.message);
  }
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
