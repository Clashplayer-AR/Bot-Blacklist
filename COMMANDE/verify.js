const Discord = require('discord.js');

exports.run = async(client, message, args) => {
    var user = message.mentions.users.first() || message.author;
    const staffs = ["327817619300286464","398483823932866560","323181366021718019"];
    if (!staffs.includes(user.id)) {
      return message.channel.send(`:x: L\'utilisateur ${user.username} ne fait pas parti(e) de nos équipes.`)
    };
    message.channel.send(`:white_check_mark: ${user.username} fait bien parti de nos équipes.`);
  }
  
  module.exports.help = {
    name: "verif-staff"
  }