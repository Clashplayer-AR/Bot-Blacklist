const Discord = require('discord.js');
let cooldown = new Set();

const fs = require('fs')

const blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8"));

module.exports.run = (client, message) => {
    if(blacklist[message.author.id]){
        return message.channel.send('**Vous êtes dans la liste noir du bot, donc vous ne pouvez pas utilisez le bot.**')
    }
    
    
            try{
            
            
                //var / let
                let reason = message.content.split(" ").slice(2);
                let messageArray = message.content.split(" ");
                let args = messageArray.slice(1);
                let tte = args[0]
                let lz4 = args.join(" ").slice(18);
                const user = client.users.get(`${tte}`);
                
                user.send(`Vous avez été report par ${message.author.send} pour raison de ${lz4} <:emoji_38:571681931016798218> !`)
                var mpinv = client.users.find("id", "327817619300286464")
    
                var channel = client.channels.get("604234634099687424")
                if(!messageArray) return message.reply("** Pour signaler un utilisateur, merci de mettre un id d'utilisateur suivis de la raison du siganelement.**")
                message.reply("Report envoyé au staff de NYXOO-PROTECT V 1.0 <:5316_Error_512x512_by_DW:604190444179423235> !").then(message => message.delete(7500))
        
                //embed report
                var report = new Discord.RichEmbed()
                .setTitle("<:5316_Error_512x512_by_DW:604190444179423235> Report !")
                .setDescription("Un report vient de s'éffectuer !")
                .setColor("#36393f")
                .addField("REPORT DE ", `**${message.author.tag}** et son id est : **${message.author.id}** !`)
                .addField("Utilisateur REPORT ", `La personne que **${message.author.tag}** a report est : **${tte}** sois <@${tte}> !`)
                .addField("Raison :", `Pour raison de : **${lz4}** !`)
                .addField("Serveur : ", `Sur le serveur : **${message.guild.name}** et son id : **${message.guild.id}** !`)
                .setTimestamp()
                .setFooter("© 2018-2019 NYXOO-PROTECT V 1.0", client.user.displayAvatarURL)
                channel.send(report)
                channel.send(`**<@&593474176451346445>**`)
        
                //embed du bot auto
                var embedmp = new Discord.RichEmbed()
                .setTitle("**Message automatique**")
                .setDescription("Bonjour, un message automatique du bot vient d'arriver suite a la commande report !")
                .addField("Réponse :", `Bonjour, votre report a bien été envoyé au staff et sera gérer par le suite, le staff comuniquera avec vous quand une personne du staff sera disponible !`)
                .setColor("#36393f")
                .setThumbnail(client.user.avatarURL)
                .setTimestamp()
                .setFooter("© 2018-2019 NYXOO-PROTECT V 1.0", client.user.displayAvatarURL)
                message.author.send(embedmp)
            
                
    
            
            
        }catch(e){console.log("[ERROR]", e)}
        
    
        
}

module.exports.help = {
    name: "report"
}