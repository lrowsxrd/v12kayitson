const endless = require('discord.js');
exports.run = async (client, message, args) => {
  const endlessses = message.guild.channels.cache.filter(c => c.type === 'voice'); 
  let westracc = 0
  let  endlessuye = message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status !== "offline").size 
  let metinkanallari = message.guild.channels.cache.filter(m => m.type == "text").size; 
  for (const [id, voiceChannel] of endlessses) westracc += voiceChannel.members.size;
  const endlessembed = new endless.MessageEmbed()
  .setColor("#0b0067")
  .setFooter("Lrows")
  .setTimestamp()
  .setDescription(`
\`>\` Sunucunuzda olan ***Toplam*** \`${message.guild.memberCount}\` üye bulunmakta
\`>\` Sunucunuzda durumu ***Açık*** olan \`${endlessuye}\` açık üye bulunmakta
\`>\` Sunucunuzda durumu ***Çevrimiçi*** olan \`${message.guild.members.cache.filter(o => o.presence.status === 'online').size}\` kişi bulunmakta
\`>\` Sunucunuzda durumu ***Boşta*** olan \`${message.guild.members.cache.filter(i => i.presence.status === 'idle').size}\` kişi bulunmakta
\`>\` Sunucunuzda durumu ***Rahatsız Etmeyinde*** olan \`${message.guild.members.cache.filter(i => i.presence.status === 'dnd').size}\` kişi bulunmakta
`)
  message.channel.send(endlessembed)
  }
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [], // Endless
  permLevel: 0
}

exports.help = {
  name: 'say',
  usage: "say",
  description: "Endless V12 Kayıt Botu"
};