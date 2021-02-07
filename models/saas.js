const mongoose = require("mongoose");

const saas = new mongoose.Schema({//'Vu4ll#0586
  sunucu: String,
  durum: String
});

const MessageModel = (module.exports = mongoose.model("saas", saas));
