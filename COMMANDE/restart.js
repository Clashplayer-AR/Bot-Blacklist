const Discord = require('discord.js')

module.exports.run = (client, message) => {
    message.delete(message.author)
            let Staff = ["352037237443002368", "490220102650953729"];
            if (Staff.includes(message.author.id)) {
                function resetBot() {
                    message.channel.send("*Redémarrge en cours...*").then(client => client.destroy().then(client.login("NTY2MjIyNTU1MDAyNjk5Nzc2.XMh6-A.Nba_AveQIZbqN1c90Z7rrE8GVSU")))
                    console.log("Redémarrage en cours")
                }
            
                resetBot()
            
                message.channel.send("*Rédemarrage effectuer avec succes !*")
                console.log("Rédemarrer")
                }else{
                    return message.channel.send("Tu n'as pas les permissions.")
                }
}

module.exports.help = {
    name: "restart"
}