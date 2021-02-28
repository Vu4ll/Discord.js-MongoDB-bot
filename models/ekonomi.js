const mongoose = require("mongoose");

const ekonomi = new mongoose.Schema({// 'Vu4ll#0586
  sunucu: String,
  kullanıcı: String,
  para: { type: Number, default: 100 }
});

const MessageModel = (module.exports = mongoose.model("ekonomi", ekonomi));
