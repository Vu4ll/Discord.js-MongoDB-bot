const mongoose = require("mongoose");

const otorol = new mongoose.Schema({//'Vu4ll#0586
  sunucu: String,
  rol: String
});

const MessageModel = (module.exports = mongoose.model("otorol", otorol));
