const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
 if (!message.member.roles.cache.has("913917134239838219") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setDescription('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!').setColor("ff0000"));
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir kullanıcıyı etiketlemen gerekiyor!`).setFooter('Lrows').setColor("ff0000")).then(m => m.delete({timeout: 8000}));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
   let isim = args[1];
      if(!isim) return message.channel.send(new Discord.MessageEmbed().setDescription(`Kayıt edebilmek için isim belirtmen gerekli!`).setFooter('Lrows').setColor("ff0000")).then(m => m.delete({timeout: 5000}));
   let yas = args[2];
      if(!yas) return message.channel.send(new Discord.MessageEmbed().setDescription(`Kayıt edebilmek için yaş belirtmen gerekli!`).setFooter('Lrows').setColor("ff0000")).then(m => m.delete({timeout: 5000}));
await member.setNickname(`● ${isim} | ${yas}`)
  member.roles.add("913916899358814258"); // Erkek rol ID
  member.roles.remove("913916915540455464"); //(Unregister) Rolünün ID
     const lrowskanal = message.guild.channels.cache.find(c => c.id == "913917088303833158") //Chat kanalının ID
    const embed1 = new Discord.MessageEmbed() 
    .setDescription(`<@!${member.id}> **Aramıza <@&913916899358814258> olarak katıldı sıcak bir hoşgeldin diyelim!** \`${member.guild.memberCount}\` **Üyeye Ulaştık**`)
    .setColor("RANDOM")
  let embed = new Discord.MessageEmbed() 
  .setColor("66FF00")                                                           
  .setTimestamp()
  .setDescription(`<@!${member.id}> <@&913916899358814258> olarak kayıt edildi!`) 
  .setFooter(`Lrows`)
  .setFooter(`Komutu Kullanan Yetkili : ${message.author.username}`)
  return message.channel.send(embed).then(lrowskanal.send(embed1)).then
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["erkek" , "e"],
  permLevel: 0
}
exports.help = {
  name: 'erkek',

}// lrows
