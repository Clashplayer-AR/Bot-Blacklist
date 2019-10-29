const Discord = require('discord.js')

const fs = require('fs')

const blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));

module.exports.run = (client, message) => {
    if(blacklist[message.author.id]){
        return message.channel.send('**Vous êtes dans la liste noir du bot, donc vous ne pouvez pas utilisez le bot.**')
    }

    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("<:5316_Error_512x512_by_DW:604190444179423235> Vous n'avez pas la permission d'utiliser cette commande ;(")

    let args = message.content.split(" ").slice(0.5);

    const argsp = message.content.trim().slice(7)

    const id = args[0]

    if(!argsp) return message.channel.send('**<:5316_Error_512x512_by_DW:604190444179423235>Merci de mettre un __id__ d\'utilisateur.**')

    client.fetchUser(args[1]).then(user => {

        const reason = message.content.trim().slice(26)

        if(!reason) return message.channel.send('**<:5316_Error_512x512_by_DW:604190444179423235>Merci de mettre une raison**')

        message.channel.send(`**\:1697_Success_512x512_by_DW:  L\'utilisateur \`${user.tag}\` a bien été banni.**`)

        message.channel.guild.ban(user, {reason : reason})

    }).catch(err => {
        if(err) message.channel.send(`-> **Mauvais ID**`)
    })


}

module.exports.help = {
    name: "banid"
}