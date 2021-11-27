const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
 if (!message.member.roles.cache.has("913917134239838219") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setDescription('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!').setFooter('').setColor("Black"));
  let uye = message.mentions.users.first()
  if (!uye) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir kullanıcı etiketlemen gerekli!`).setFooter('Lrows').setColor("ff0000"));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(uye)
   let isim = args[1];
   let yas = args[2];   
   if(!isim) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir isim belirtmen gerekli!`).setFooter('Lrows').setColor("ff0000")).then
await member.setNickname(`● ${isim} | ${yas}`)
  let endlessembed = new Discord.MessageEmbed() 
  .setColor("66FF00")
  .setDescription(`**Kullanıcının ismi başarıyla değiştirildi.**`) 
  .setFooter('Lrows')
  return message.channel.send(endlessembed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isim" , "i"],
  permLevel: 0
}
exports.help = {
  name: 'isim',

}