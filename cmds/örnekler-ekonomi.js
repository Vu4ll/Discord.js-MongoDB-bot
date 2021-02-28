const Discord = require("discord.js");
const eko = require("../models/ekonomi"); // modelimizi tanımladık
const { prefix } = require("../config/config.json");

exports.run = async (client, message, args) => {
  if (!args[0])
    return message.channel.send( // ekle/çıkar/param yazılmamış ise mesaj atsın
      `**${prefix}ekonomi <ekle/çıkar/param>** olarak kullan!`
    );

  if (args[0] == "ekle") {
    // ekleme
    const data = await eko.findOne({ // sunucu ve kullanıcı verisini aldık
      sunucu: message.guild.id,
      kullanıcı: message.author.id
    });
    if (args[1] <= 0) return message.reply(`sıfırdan küçük bir değer eklemek için deli olman gerek.`);
    if (!data) { // veri yoksa yapılacak işlem
      new eko({
        sunucu: message.guild.id,
        kullanıcı: message.author.id,
        para: 100
      }).save();
    }
    if (!args[1] || isNaN(args[1]))
      return message.channel.send(`Lütfen geçerli bir sayı gir!`); // rakam girilmemiş ise veya rakam değilse mesaj atsın
    data.para += Math.floor(parseInt(args[1]));
    data.save(); // paranıza args[1] değerinde para ekledik
    message.reply(
      `bakiyene **${args[1]}** değerinde para eklendi! Şu anki bakiyen: **${data.para}**`
    ); // kanalımıza mesajı attık
    // ekleme son
  }
  if (args[0] == "çıkar") {
    // çıkarma
    const data = await eko.findOne({ // sunucu ve kullanıcı verisini aldık
      sunucu: message.guild.id,
      kullanıcı: message.author.id
    });
    if (!data) { // veri yoksa yapılacak işlem
      new eko({
        sunucu: message.guild.id,
        kullanıcı: message.author.id,
        para: 100
      }).save();
    }
    if (!args[1] || isNaN(args[1]))
      return message.channel.send(`Lütfen geçerli bir sayı gir!`);
    if (args[1] >= data.para || args[1] <= 0) 
      return message.reply(`kendi parandan daha yüksek bir değer çıkartmak mı?`)
    data.para -= Math.floor(parseInt(args[1]));
    data.save(); // paramızı args[1] değerinde azalttık
    message.reply(
      `bakiyenden **${args[1]}** değerinde para azaldı! Şu anki bakiyen: **${data.para}**`
    ); // kanalımıza mesajı attık
    //çıkarma son
  }
  if (args[0] == "param" || args[0] == "bakiye") {
    // bakiye verisini çekme
    const data = await eko.findOne({ // sunucu ve kullanıcı verisini aldık
      sunucu: message.guild.id,
      kullanıcı: message.author.id
    });
    if (!data) { // veri yoksa yapılacak işlem
      new eko({
        sunucu: message.guild.id,
        kullanıcı: message.author.id,
        para: 100
      }).save();
         /* 
         Burada ufak bir not düşmeliyim
         Şimdi veri olmadığı zaman bu veriyi kayıt edecek
         Ama kanala mesajı atmayacak, komutu tekrar kullanınca mesajı atacaktır. 
         */
    }
    message.reply(`bakiyen **${data.para}**`);
    // bakiye verisini çekme son
  }
};

exports.help = {
  name: "ekonomi",
  aliases: ["eko"],
  description: "",
  usage: ""
};
