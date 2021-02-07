const Discord = require("discord.js");
const mongoose = require("mongoose");
const client = new Discord.Client({ disableMentions: "everyone" });
const fs = require("fs");
const http = require("http");
const express = require("express");
const ayarlar = require("./json/ayarlar.json")
require("./util/eventLoader.js")(client);

// 7/24
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Wuhuuu. 7/24 Aktifim");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//mongoose bağlantı
mongoose.connect(ayarlar.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then(console.log("MongoDB bağlandı!"));
//mongoose bağlantı son

//oynuyor
client.on("ready", async () => {
  setTimeout(function() {
    client.user.setPresence({
      activity: { name: "Developed By: 'Vu4ll#0586" },
      status: "dnd"
    });
  }, 1000);
  console.log("Durum Ayarlandı!");
});
//oynuyor son

//command handler
const log = message => {
  console.log(`${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
//command handler son

client.login(ayarlar.token)

//otorol
client.on("guildMemberAdd", async (member) => {//'Vu4ll#0586
  if (member.bot) return;
  const otorol = require("./models/otorol");

  const data = await otorol.findOne({
    sunucu: member.guild.id
  });
  if (!data) return;
  if (data) 
   return member.roles.add(`${data.rol}`);
});
//otorol son

//sa-as
client.on("message", async message => {//'Vu4ll#0586
  const content = message.content.toLowerCase();
  const saas = require("./models/sa-as");
  const data = await saas.findOne({
    sunucu: message.guild.id
  });

  if (
    content == "sa" ||
    content == "sea" ||
    content == "selamün aleyküm" ||
    content == "selamünaleyküm" ||
    content == "s.a"
  ) {
    if (message.author.bot) return;
    if (data) {
      message.reply(`aleykümselam. Hoş geldin!`);
    } else if (!data) {
      return;
    }
  }
});//'Vu4ll#0586
//sa-as son
