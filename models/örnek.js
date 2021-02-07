const mongoose = require("mongoose");

const örnek = new mongoose.Schema({
  //  ^^^ 1
  sunucu: String, // sunucu yazan yeri şöyle göstereyim: db.get(`örnek_${message.guild.id}`) bunun gibi işlem görüyor
  örnekveri: String
});

const MessageModel = (module.exports = mongoose.model("örnek", örnek));
//                                                     ^^2  || ^^3

// 1,2 ve 3 ile işaretli olan yerlere aynı şeyleri yazın
// datalar için bu dosyayı kullanacaz
