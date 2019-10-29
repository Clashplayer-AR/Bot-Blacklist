const Discord = require('discord.js')

const fs = require('fs')

const blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8"))

module.exports.run = (client, message) => {
    let Admin = ['352037237443002368']
    let vpsupport = client.guilds.find('id', '566223019266146304')

    if(Admin.includes(message.author.id)){
        let channel = client.channels.find('id', '600972447671386133')
        if(!channel) return message.channel.send('**Salon inexistant, par conséquence, je ne peut rien faire.**')
        message.channel.send('**Salon en mise à jour...**').then(msg => msg.edit('**Salon mis à jour sur ViperProtection !**')(200))
        channel.setName(`Nombre d'utilisateurs : ${client.users.size}`, `voice`)
    }else{
        return
    }
}

module.exports.help = {
    name: "reload-usercount"
}