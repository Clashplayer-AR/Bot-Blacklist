const Discord = require('discord.js')

module.exports.run = (client, message) => {
    if(message.author.bot) return;
            message.delete(message.author)
            let Staff = ["352037237443002368", "490220102650953729"];
            if (Staff.includes(message.author.id)) {
                function stopBot() {
                    message.channel.send("*Arret en cours...*").then(message => client.destroy())
                    console.log("Arret en cours")
                }
            
                stopBot()
            
                message.channel.send("*Arret effectuer avec succes !*")
                console.log("stop")
                }else{
                    return message.channel.send("Tu n'as pas les permissions.")
                }
}

module.exports.help = {
    name: 'stop-bot'
}