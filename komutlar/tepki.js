const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const react = require("../models/react");
const { prefix } = require("../ayarlar.json");

exports.run = async (client, message, args) => {// 'Vu4ll#0586
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.reply(
      `bu komutu kullanmak için **sunucuyu yönet** yetkisine sahip olmalısın!`
    );

  if (!args[0])
    return message.reply(
      `doğru kullanım: ${prefix}tepki <ayarla/sıfırla/veriler>`
    );

  if (args[0] == "ayarla") {
    const data = await react.findOne({
      sunucu: message.guild.id
    });

    if (data)
      return message.reply(
        `tepki sistemi zaten ayarlı. Sıfırlamak için: ${prefix}tepki sıfırla`
      );

    let kanal =
      message.mentions.channels.first() ||
      message.guild.channels.cache.find(c => c.id === args[1]);
    if (!kanal) return message.reply(`bir kanal etiketlemelisin!`);

    let id = args[2];
    let emoji = message.guild.emojis.cache.find(a => a.id == id) || args[2];
    if (!emoji) return message.reply(`bir emoji ya da emoji id'si gir`);

    let newData = new react({
      sunucu: message.guild.id,
      kanal: kanal.id,
      emoji: emoji
    });
    newData.save();
    message.channel.send(
      `Tepki sistemi aktif! ${kanal} kanalına yazılan her mesaja ${emoji} emojisini tepki olarak ekleyeceğim.`
    );
  }

  if (args[0] == "sıfırla") {
    const data = await react.findOne({
      sunucu: message.guild.id
    });

    if (!data)
      return message.reply(
        `bu sunucuda tepki sistemi ayarlı olmadığı için sıfırlayamam!`
      );

    message.channel
      .send(
        `Başarıyla sıfırlandı! <#${data.kanal}> kanalındaki mesajlara artık tepki eklenmeyecek.`
      )
      .then(x => react.findOneAndRemove(data.kanal))
      .then(x => react.findOneAndRemove(data.emoji));
  }

  if (args[0] == "veriler") {
    const data = await react.findOne({// 'Vu4ll#0586
      sunucu: message.guild.id
    });
    
    if(!data.kanal) return message.channel.send(`Veri yok.`)
    if(!data.emoji) return message.channel.send(`Veri yok.`)
    
    const e = new MessageEmbed()
    .setTitle(`Tepki verileri`)
    .setColor(`BLACK`)
    .addField(`Tepki kanalı:`, `<#${data.kanal}>`)
    .addField(`Tepkilere eklenen emoji:`, data.emoji)
    .setFooter(`${message.author.tag} tarafından istendi.`)
    .setTimestamp();
    
    message.channel.send(e)
    
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["react"],
  permLevel: 0
};

exports.help = {// 'Vu4ll#0586
  name: "tepki",
  description: "",
  usage: ""
};
