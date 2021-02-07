const Discord = require("discord.js");
const mongoose = require("mongoose");
const model = require("../models/örnek"); // models klasöründeki dosyamızı tanımladık
//    ^^ bu tanım lazım olacak

exports.run = async (client, message, args) => {
  if (!args[0])
    return message.channel.send(`!örnek <kayıt/veri/sil> şeklinde kullan.`);
  if (args[0] == "kayıt") {
    // veri kayıt etme
    const data = await model.findOne({ // model kısmına 3. satırdaki tanımı yazıyoruz
      sunucu: message.guild.id // komutun kullanıldığı sunucudan veriyi çekecez
    });

    if (!args[1])
      return message.channel.send(`sorması ayıp ama ben neyi kayıt edecem??`); // veri girilmemiş ise kanal mesaj atsın

    if (data) return message.channel.send(`veri var zaten`); // veri varsa veri olduğunu kanala mesaj atsın

    let newData = new model({ // yeni data kayıt etmek için
      sunucu: message.guild.id, // komutun kullanıldığı sunucu için kayıt edecek
      örnekveri: args[1] // örnekveri kısmını da "!örnek kayıt deneme" deneme diye kayıt edecek
    });
    // not: yeni data kayıt ederken kullandığınız model dosyasındaki kısımları yazın
    // mesela orada olmayan bir şey yazarsanız çalışmaz
    // örnek diye bir şey yok models/örnek.js de. eğer biz buraya örnek eklersek olmaz
    newData.save().then(x => console.log(x)); // veriyi kayıt ettik ve sonucu konsola log aldık
    message.channel.send(`veriyi \`${args[1]}\` olarak kayıt ettim`); // kanala mesajımızı attık
    // veri kayıt son
  }

  if (args[0] == "veri") {
    //veri çekme
    const data = await model.findOne({ // model kısmına 3. satırdaki tanımı yazıyoruz
      sunucu: message.guild.id // komutun kullanıldığı sunucudan veriyi çekecez
    });
    if (!data) return message.channel.send(`veri yok`); // veri yoksa kanala mesaj atsın
    if (data) return message.channel.send(data.örnekveri); // data.örnek verisi varsa veriyi kanala atsın
    // veri çekme son
  }

  if (args[0] == "sil") {
    //veri silme
    const data = await model.findOne({
      sunucu: message.guild.id // sunucudaki veriyi aldık
    });
    if (!data) return message.channel.send(`veri yok silemem`); // veri yoksa kanala mesaj atsın
    if (data)
      return model.findOneAndRemove(data.örnekveri).then((
        x // sunucudaki 'örnekveri' verisini sildik
      ) => message.channel.send(`veri silindi`)); // veri silindikten sonra kanala mesaj attık
    // veri silme son
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "örnek",
  description: "",
  usage: ""
};
