const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  response.sendStatus(200);
});
const Discord = require("discord.js");
const db = require('quick.db')
const client = new Discord.Client();
const ayarlar = require('./lrows.json')
const fs = require("fs");
const moment = require("moment");
moment.locale("tr")
const chalk = require("chalk");
require("./util/eventLoader")(client);



const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    console.log("Lrows V12 Kayıt!")
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

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

client.on('message', msg => {
    if (msg.content === '!tag') {
        msg.channel.send(`TAGINIZ`); // TAGINIZI YAZIN
    } else if (msg.content === 'tag') {
        msg.channel.send(`osuruk`);// TAGINIZI YAZIN
        }
    }
);
client.on("guildMemberAdd", member => {  
  const kanal = member.guild.channels.cache.find(r => r.id === "913917088303833158"); //HOŞGELDİN MESAJI ATILACAĞI KANAL IDSINI GİRİN 
    
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
  const gecen = moment.duration(kurulus).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
   
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'CARPIEMOJIDSI'
  if (kurulus > 1296000000) kontrol = 'TIKEMOJİIDSI'
  moment.locale("tr");
  kanal.send(":tada: Sunucumuza Hoş Geldin ! <@" + member + "> \n\n Hesabın "+ gecen +" Önce Oluşturulmuş "+kontrol+" \n\n Sunucu kurallarımız <#913917088303833158> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek. \n\n Seninle beraber **" + member.guild.memberCount + "** kişi olduk , Tagımızı alarak bizlere destek olabilirsin , Kayıt olmak için teyit odalarına girip ses teyit vermen gerekiyor <@&YETKILIROLID> seninle ilgilenecektir  İyi eğlenceler !")
  });

client.on("userUpdate", async (oldUser, newUser) => {
if (oldUser.username !== newUser.username) {
let lrowstag = "TAGINIZ"; //Tagınızı yazın
let lrowsunucu = "913915757245636619"; //Sunucu ID'sini giriniz
let lrowskanal = "913918139455143946" //Mesajın atılacağı log kanalını giriniz
let lrowsrol = "TAGLIROLU ID";//Taglı rolünün ID'sini giriniz 
if (newUser.username.includes(lrowstag) && !client.guilds.cache.get(lrowsunucu).members.cache.get(newUser.id).roles.cache.has(lrowsrol)) {
client.channels.cache.get(lrowskanal).send(`**${newUser} adlı kişi ${lrowstag} tagımızı aldığı için <@&${lrowsrol}> rolü verildi !**`)
client.guilds.cache.get(lrowsunucu).members.cache.get(newUser.id).roles.add(lrowsrol) }
if (!newUser.username.includes(lrowstag) && client.guilds.cache.get(lrowsunucu).members.cache.get(newUser.id).roles.cache.has(lrowsrol)) {
client.guilds.cache.get(lrowsunucu).members.cache.get(newUser.id).roles.remove(lrowsrol)
client.channels.cache.get(lrowskanal).send(`**${newUser} adlı kişi ${lrowstag} tagımızı çıkardığı için <@&${lrowsrol}> rolü alındı !**`) } } })