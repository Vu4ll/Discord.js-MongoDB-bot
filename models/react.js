const mongoose = require("mongoose");

const react = new mongoose.Schema({// 'Vu4ll#0586
  sunucu: String,
  kanal: String,
  emoji: String
});

const MessageModel = (module.exports = mongoose.model("react", react));
