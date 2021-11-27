const Discord = require('discord.js');


exports.run = function(client, message) {

    message.channel.send("Bot sıfırdan başlatılacak!").then(msg => {
        console.log("Lrows");
        process.exit(0);
    });

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["reboot" , "reset"],
  permLevel: 0
}
exports.help = {
  name: 'reboot',

}

