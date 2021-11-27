const Discord = require("discord.js");
const qdb = require("quick.db");


module.exports.run = async (client, message, args, ayar, emoji) => {
  let embed = new Discord.RichEmbed().setAuthor(message.member.displayName, message.author.avatarURL).setFooter("Lrows").setColor('RANDOM').setTimestamp();
  if(!message.member.roles.has('913917134239838219') && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Kayıtsız komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete(5000));
  let kisi = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!kisi) return message.channel.send(embed.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete(5000));
  if (message.member.highestRole.position < kisi.highestRole.position) return message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete(5000));
  if(kisi.manageable) kisi.setNickname(kisi.user.username).catch();
  await kisi.setRoles('913916915540455464').catch();
  message.channel.send(embed.setDescription(`${kisi} üyesi, ${message.author} tarafından kayıtsıza atıldı!`)).catch();
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [], 
  permLevel: 0
}

exports.help = {
  name: 'kayıtsız',
  usage: "kayıtsız [üye]",
  description: "Belirtilen üyeyi kayıtsıza atar."
}; 