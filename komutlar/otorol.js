const mongoose = require("mongoose");
const Discord = require("discord.js");
const otorol = require("../models/otorol");
const ayarlar = require("../ayarlar.json");
const pr = ayarlar.prefix;

exports.run = async (client, message, args) => {//'Vu4ll#0586
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.reply(
      `bu komutu kullanmak için **rolleri yönet** yetkisine sahip olmalısın!`
    );
  if (!args[0])
    return message.reply(`doğru kullanım: ${pr}otorol <ayarla/sıfırla>`);
  if (args[0] == "ayarla") {
    const data = await otorol.findOne({
      sunucu: message.guild.id
    });
    if (data)
      return message.reply(
        `otorol zaten ayarlanmış! Sıfırlamak için: ${pr}otorol sıfırla`
      );
    let rol =
      message.mentions.roles.first() ||
      message.guild.roles.cache.find(r => r.id == args[1]);
    if (!rol) return message.reply(`bir rol etiketlemelisin!`);
    let newData = new otorol({
      sunucu: message.guild.id,
      rol: rol.id
    });
    newData.save();
    message.channel.send(`Otorol başarıyla ayarlandı!`);
  }
  if (args[0] == "sıfırla") {
    const data = await otorol.findOne({
      sunucu: message.guild.id
    });
    if (!data)
      return message.reply(
        `bu sunucuda otorol ayarlı olmadığı için sıfırlayamam!`
      );
    otorol.findOneAndRemove(data.rol);
    message.channel.send(`Otorol başarıyla sıfırlandı!`);
  }
};

exports.conf = {//'Vu4ll#0586
  enabled: true,
  guildOnly: false,
  aliases: ["oto-rol"],
  permLevel: 0
};

exports.help = {
  name: "otorol",
  description: "",
  usage: "otorol <ayarla/sıfırla> <rol etiket>"
};
