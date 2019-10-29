const Discord = require('discord.js')

const moment = require('moment');
require('moment-duration-format');
moment.locale('fr');

const fs = require('fs')

const blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8"));

module.exports.run = (client, message) => {
    if(message.author.bot) return;
                let Staff = ["327817619300286464", "398483823932866560"];
        if (Staff.includes(message.author.id)) {
            let args = message.content.split(" ").slice(1);
            
    const id = args[0]
    const iduser = args[0]
    const reason = message.content.split(" ").slice(18);
    if(!id) return message.channel.send("**<:565782461317906445:604187279790964751> Merci de mettre un id d'utilisateur.**")

    let bl = client.channels.get('603899987192971264');
    let blacklist1 = new Discord.RichEmbed()
            .setTitle(`<:Succes:604190338676031488> **ADDBLACKLIST**`)
            .setDescription(`Blacklist par  ${message.author.tag}`)
            .addField(`ID:`, `${id}`)
            .addField("Raison:", "**" + args.join(" ").slice(18) + "**")
            .setColor("#36393f")
            .setFooter(`BlackListed | NYXOO-PROTECT`)
            .setTimestamp();
        bl.send(blacklist1);

        if (blacklist[id]) {
            return message.channel.send("<:565782461317906445:604187279790964751>  Erreur: **ID** déjà blacklist ");
        }else{
        if (id.length === 0) {
        blacklist[id] = {"reason" : true, "date" : true, "author" : true};
        message.delete();
        }else{
       blacklist[id] = {"reason" : "Blacklisted-Id: " + args.join(" ") + ". Blacklisted by: " + message.author.username};

        blacklist[id] = {"reason" : args.join(" ").slice(18), "date" : moment.utc(message.createdAt).format('LL'), "author" : message.author.tag};
        message.delete();
        var embedbl = new Discord.RichEmbed()
        .setTitle("<:565782461317906445:604187279790964751> Succès !")
        .setColor("#36393f")
        .setDescription(`**<:565782461317906445:604187279790964751> ID** ` + '"' + id + '"' + `**a bien été blacklisté !**`)
        .setTimestamp()
        .setFooter("© 2018-2019 NYXOO-PROTECT V 1.0 ", client.user.displayAvatarURL)
        message.channel.send(embedbl)
        }
        fs.writeFile("./json/blacklist.json", JSON.stringify(blacklist), (err) => { if (err) console.error(err);})
        }
        console.log(`[BlackList] "${id}" a été blacklist! Par: ${message.author.username}. Raison: ${args}`)
    }else{
        message.channel.send(`:octagonal_sign: Désolé mais tu n'est pas du staff ${message.author} !`)}
        }
    
module.exports.help = {
    name: "bl"
}