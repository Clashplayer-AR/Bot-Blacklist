const Discord = require('discord.js')

const fs = require('fs')

const staff = JSON.parse(fs.readFileSync("./json/staff.json", "utf8"))

module.exports.run = (client, message) => {

    let Staff = ["352037237443002368"];

    if (Staff.includes(message.author.id)) {

        let args = message.content.split(" ").slice(1.5);
                
        const id = args[0]

        if(!id) return message.channel.send('Merci de mettre un **id** valide.')

        client.fetchUser(args[0]).then(user => {

            if (staff[id]) {
                delete staff[id];
                if (message.member.nickname === null) {
                    message.channel.send(`**L'utilisateur \`\`${user.tag}\`\` vient d'être rétrogradé en \`Utilisateur\`.**`)
                }else{
            
            }
            fs.writeFile("./json/staff.json", JSON.stringify(staff), (err) => { if (err) console.error(err);});
        }else{
            message.channel.send(`<:emoji_42:571681785579175937> [ERROR]: Cet **ID** n'est pas staff du bot`).then(message => message.delete(2000));
        }
            

            

        }).catch(err => {
            message.channel.send('Mauvais ID')
        })

    }
}

module.exports.help = {
    name: "rankdown"
}