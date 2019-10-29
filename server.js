const Discord = require('discord.js');
const cooldown = new Set();

var superagent = require('superagent');
const fs = require('fs');
//const noykou = require('noykou')
//const giveaways = require("discord-giveaways"),
//allGiveaways = giveaways.fetch();
//let onServer = allGiveaways.filter((g) => g.guildID === "1909282092");
//let notEnded = allGiveaways.filter((g) => !g.ended);
const antispam = require('discord-anti-spam')


const { TOKEN, PREFIX } = require('./config');

const prefix = 'n!';
const client = new Discord.Client({
    disableEveryone: true
});
const blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8"));
const warns = JSON.parse(fs.readFileSync("./json/warns.json", "utf8"))
//const YouTube = require('simple-youtube-api');
//const economy = JSON.parse(fs.readFileSync("./json/economy.json", "utf8"))
//const hastebin = require('hastebin-gen');
const moment = require('moment');
require('moment-duration-format');
moment.locale('fr');
const ms = require('ms');
//const youtube = new YouTube(GOOGLE_API_KEY);
const ytdl = require('ytdl-core');
var owner = client.users.find("id", "327817619300286464");
var coowner = client.users.find("id", "490220102650953729");
const path = require('path');
const queue = new Map();


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (error, f) => {
    if(error) console.log(error);
   
    let commandes = f.filter(f => f.split(".").pop() === "js");
   if(commandes.length <= 0) return console.log("Aucune commande trouvée !");
   
   commandes.forEach((f) => {
       let commande = require(`./commands/${f}`);
       console.log(`${f} loaded !`);
  
       client.commands.set(commande.help.name, commande);
     });
   });
   
   fs.readdir("./events", (err, files) => {
       //Si erreur, on la retourne pour ne pas empêcher le bon fonctionnement du bot
       if(err) {
           return console.error(err);
       };
   
       //Si aucun fichier présent dans le dossier, un avertissement s'affiche
       if(files.length <= 0) {
           return console.log("Aucun événement trouvé dans le dossier...");
       };
   
       //Chargement des events un par un
       files.forEach((evt) => {
           //Si le fichier ne se termine pas par .js, on retourne pour éviter les erreurs
           if(!evt.endsWith(".js")) return;
   
         console.log(`${evt} loaded!`);
           //On définit les events
           const events = require(`./events/${evt}`);
           const event = evt.split(".")[0];
   
           //Exécution des events
           client.on(event, events.bind(null, client));
       });
   
       //Information, les events se chargent
       console.log("Les événements ont été chargés avec succès !");
     })
     

client.on('message', message => {
    if(message.author.bot) return;
        if(message.channel.type === "dm") return;

    let prefix = 'n!'
    if(!message.content.startsWith(prefix)) return;
    
    
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1)

    let commandfile = client.commands.get(cmd.slice(prefix.length));
  
  if(cooldown.has(message.author.id)) return message.react('⏰')
        if(commandfile) commandfile.run(client, message, args);
        if(message.content.indexOf(prefix) !== 0) return;
  setTimeout(() => {
    cooldown.delete(message.author.id)
}, 6000)
  cooldown.add(message.author.id)
  
    
})




client.login(TOKEN)

console.log('Connexion en cours...')





    console.log("Bot on !")
    client.user.setPresence({game: {name : `n!help | Vous Protéger | ${client.guilds.size} SERVEURS `}}, {type: "STREAMING"})
    client.user.setPresence({status: 'dnd'})

    console.log(`

        ╔═════════════════════════════════╗

        ║-->  Bot Name : ${client.user.username}
 
        ╟─────────────────────────────────╢

        ║-->  Bot Id : ${client.user.id}

        ╟─────────────────────────────────╢

        ║-->  Prefix   : ${prefix} 

        ╟─────────────────────────────────╢

        ║-->  Users    : ${client.users.size}

        ╟─────────────────────────────────╢

        ║-->  Channels : ${client.channels.size}

        ╟─────────────────────────────────╢

        ║-->  Guilds   : ${client.guilds.size}

        ╚═════════════════════════════════╝`);




    client.on("guildMemberAdd", member => {
        let blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8"))
        

        

            //partie protéction
            if(blacklist[member.id]) {
        member.ban(`Membre blacklist par notre bot, Raison : ${blacklist[member.id].reason}`)
        var embed = new Discord.RichEmbed()
        .setColor("#36393f")
        .setTitle("**GBAN**")
        .setDescription("**" + member.id+"("+member.user+`), a été auto-banni de votre serveur car cet utilisateur est dans notre liste noir !
        
        
        <:Suggestion:612952734206787584> Raison du blacklist :
        \`${blacklist[member.id].reason}\`
        **`)
        .setTimestamp()
        .setFooter("© 2018-2019 NYXOO-PROTECT ", client.user.displayAvatarURL)
        member.guild.owner.createDM().then(chan => chan.send(embed))
        
        try{
        var channel = member.guild.channels.find("name", "nyxoo-protect-logs")
        var embede = new Discord.RichEmbed()
        .setColor("RED")
        .setTitle("Logs blacklist !")
        .setDescription("**" + member.user+ `, A été auto-banni du serveur car cet utilisateur est dans notre liste noir !  
        
        <:Suggestion:612952734206787584> Raison du blacklist :
        \`${blacklist[member.id].reason}\`
        **`)
        .setTimestamp()
        .setFooter("© 2018-2019 NYXOO-PROTECT 1.0", client.user.displayAvatarURL)
        
        channel.send(embede)
        }catch(e){console.log("[ERROR]",e)}
    }
    })
    })

   