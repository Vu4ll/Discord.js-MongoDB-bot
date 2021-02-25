const Discord = require("discord.js");
const mongoose = require("mongoose");
const client = new Discord.Client({ disableMentions: "everyone" });
const fs = require("fs");
const config = require("./config/config.json")
require("./util/eventLoader.js")(client);

//mongoose bağlantı
mongoose.connect(config.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then(console.log("MongoDB bağlandı!"))
  .catch(console.log("MongoDB bağlanamadı!"));
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
fs.readdir("./cmds/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./cmds/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
//command handler son

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
  const saas = require("./models/saas");
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

client.login(config.token)
