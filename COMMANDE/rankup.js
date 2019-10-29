const Discord = require('discord.js')

const moment = require('moment');
require('moment-duration-format');
moment.locale('fr');

const fs = require('fs')

const staff = JSON.parse(fs.readFileSync("./json/staff.json", "utf8"))

module.exports.run = (client, message) => {

    let Staff = ["352037237443002368"];

    if (Staff.includes(message.author.id)) {

        let args = message.content.split(" ").slice(1.5);
                
        const id = args[0]

        const grade = message.content.trim().slice(28)

        if(!id) return message.channel.send('Merci de mettre un **id** valide.')

        client.fetchUser(args[0]).then(user => {

            

           

            if (staff[id]) {
                return message.channel.send("<:emoji_42:571681785579175937> Erreur: **ID** déjà dans le staff ");
            }else{
                if(!grade) return message.channel.send('Merci de mettre un grade.')
                message.channel.send(`**L'utilisateur \`\`${user.tag}\`\` vient de passé \`\`${grade}\`\`.**`)
                if (id.length === 0) {
                    staff[id] = {"grade" : true, "date" : true, "author" : true};
                    message.delete();
            
                }else{
                staff[id] = {"grade":grade, "date":moment.utc(message.createdAt).format('LL'), "author":message.author.tag}
            }
            fs.writeFile("./json/staff.json", JSON.stringify(staff), (err) => { if (err) console.error(err);});
            }

        }).catch(err => {
            message.channel.send(`Mauvais ID`)
        })
    }
}

module.exports.help = {
    name: "rankup"
}