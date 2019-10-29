const Discord = require('discord.js')

const fs = require('fs')

const blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8"))

module.exports.run = (client, message) => {
    let Admin = ['327817619300286464']
    let vpsupport = client.guilds.find('id', '603898045729472526')

    if(Admin.includes(message.author.id)){
        message.channel.send('**Création du salon...**').then(msg => msg.edit('**Salon créer sur NYXOO-PROTECT !**')(200))
        vpsupport.createChannel(`Utilisateurs blacklist : ${Object.keys(blacklist).length }`, `voice`)
    }else{
        return
    }
}

module.exports.help = {
    name: "bl-count"
}