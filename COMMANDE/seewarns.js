const Discord = require('discord.js')

const fs = require('fs')

const blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8"));

let warns = JSON.parse(fs.readFileSync("./json/warns.json", "utf8"));
let prefix = 'd/'

module.exports.run = (client, message) => {
  if(blacklist[message.author.id]){
    return message.channel.send('**Vous êtes dans la liste noir du bot, donc vous ne pouvez pas utilisez le bot.**')
}
    if (message.channel.type === "dm") return;
        
        if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
        
            const mentioned = message.mentions.users.first();
        
            const args = message.content.split(' ').slice(1);
        
            if (message.member.hasPermission('MANAGE_MESSAGES')){
        
              if (message.mentions.users.size !== 0) {
        
                if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
        
                  try {
        
                    if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
        
                      message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
        
                      return;
        
                    }
        
                  } catch (err) {
        
                    message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
        
                    return;
        
                  }
        
                  let arr = [];
        
                  arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
        
                  for (var warn in warns[message.guild.id][mentioned.id]) {
        
                    arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
        
                    "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
        
                  }
        
                  message.channel.send(arr.join('\n'));
        
                } else {
        
                  message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
        
                  console.log(args);
        
                }
        
              } else {
        
                message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
        
              }
        
            } else {
        
              message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
        
            }
        
          }


module.exports.help = {
  name: "seewarns"
}