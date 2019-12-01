const Discord = require('discord.js');
const client = new Discord.Client();

const Games = require(__dirname + '/templates/game.js');

client.on('ready', () => {
    console.log("Logged in as " + client.user.tag);
});

class Interface {
    // a class to hold the message context of a game
    constructor (msg) {
        this.msg = msg;
        return function (obj) {
            msg.channel.send(obj.message)
            .catch(console.error);
        }
    }

}

client.on('message', (msg) => {
    if (msg.author.bot) return;
    else if (msg.content.startsWith(`<@${client.user.id}>`) || msg.content.startsWith(`<@!${client.user.id}>`)) msg.content = msg.content.substring(msg.content.search('>')+1).trim();
    else if (msg.content.startsWith(client.prefix)) msg.content = msg.content.substring(client.prefix.length()).trim();

    var game = undefined;
    if (msg.content == 'start')
    {
        game = Games.Anagram(new Interface(msg), msg.author);
        console.log(JSON.stringify(game, (k,v)=>v, 2));
    } else {
        if (game) game.step(Object.assign({}, msg));
    }
});

client.login(require(__dirname+'/private_token.json'));
// invite the exr0n test bot with https://discordapp.com/api/oauth2/authorize?client_id=650492787590168591&permissions=8&scope=bot