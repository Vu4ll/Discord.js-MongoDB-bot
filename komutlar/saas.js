const mongoose = require("mongoose");
const saas = require("../models/sa-as");
const Discord = require("discord.js");
const { prefix } = require("../ayarlar.json");

exports.run = async (client, message, args) => {//'Vu4ll#0586
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply(
      `bu komutu kullanmak için **mesajları yönet** yetkisine sahip olmalısın!`
    );

  if (!args[0]) return message.reply(`doğru kullanım: ${prefix}saas <aç/kapat>`);

  if (args[0] == "aç") {
    const data = await saas.findOne({
      sunucu: message.guild.id
    });
    if (data)
      return message.reply(`sa-as zaten açık! Kapatmak için: ${prefix}saas kapat`);

    let newData = new saas({
      sunucu: message.guild.id,
      durum: "açık"
    });
    newData.save();
    message.channel.send(`Sa-as başarıyla açıldı!`);
  }
  if (args[0] == "kapat") {
    const data = await saas.findOne({
      sunucu: message.guild.id
    });
    if (!data) return message.reply(`sa-as açık olmadığı için kapatamam!`);
    saas.findOneAndRemove(data.durum).catch(err => console.log(err))
    message.channel.send(`Sa-as başarıyla kapatıldı!`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sa-as"],
  permLevel: 0
};

exports.help = {//'Vu4ll#0586
  name: "saas",
  description: "",
  usage: "saas <aç/kapat>"
};
