const Discord = require('discord.js')

module.exports.run = (client, message) => {
    let Admin = ['352037237443002368']
    let vpsupport = client.guilds.find('id', '566223019266146304')

    if(Admin.includes(message.author.id)){
        message.channel.send('**Création du salon...**').then(msg => msg.edit('**Salon créer sur ViperProtection !**')(200))
        vpsupport.createChannel(`Nombre d'utilisateurs : ${client.users.size}`, `voice`)
    }else{
        return
    }
}

module.exports.help = {
    name: "users-count-setup"
}