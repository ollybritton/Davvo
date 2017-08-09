//jshint esversion: 6
const Discord = require("discord.js");
const requestify = require("requestify");
const priv = require("./private");
const mark = require("./mark");
const _ = require("./usefull");
const client = new Discord.Client();

const colors = {
    pink: '\033[95m',
    blue: '\033[94m',
    green: '\033[92m',
    yellow: '\033[93m',
    red: '\033[91m',
    end: '\033[0m',
    bold: '\033[1m',
    underline: '\033[4m'
};

let params = {
    chattiness: 0.5
};


client.on("ready", () => {

    console.log(`${colors.green}=== Davvo Is Online ===${colors.end}`);

});

client.on("message", message => {

    let history = [];

    message.channel.fetchMessages({
            limit: 100
        })
        .then(messages => {
            messages.forEach((item, key, map) => {
                history.push(item.toString());
            });

            let command = _.command_parse(message.content, "/davvo") || false;
            if (command !== false) {


                console.log(`${colors.blue}+ User ${message.author.username} (${message.author}) issued command:${colors.end}${colors.pink} ${command.join(" ")}${colors.end}`);

                if (command[0] === "reply") {
                    let map = mark.map(history);
                    let gen_message = mark.create(map) || "`nothing`";

                    if(gen_message.split(" ")[0] == "/davvo" || gen_message.split(" ")[0] == ";;") {
                        gen_message = `\`${gen_message}\``;
                    }

                    console.log(`${colors.blue}- Created message:${colors.end} ${colors.pink}${gen_message}${colors.end}`);
                    message.channel.send(gen_message);
                }

                if (command[0] === "game") {
                    let game = command.slice(1).join(" ");
                    console.log(`${colors.blue}- Setting Davvo's game to: ${colors.end + colors.pink + game + colors.end}`);
                    client.user.setGame(game);
                    message.reply("Set **Davvo's** game to:\n\nPlaying **" + messageArgs + "**");
                }

                if (command[0] === "xkcd") {

                    requestify.get('https://xkcd.com/info.0.json').then(function(response) {
                        var pr = response.getBody();

                        const embed = new Discord.RichEmbed();
                        embed.setTitle(pr.safe_title);
                        embed.setDescription(pr.alt);
                        embed.setFooter('This XKCD was brought to you by Davvo', 'http://charliebritton.me/IMG_0057.JPG');
                        embed.setColor([255, 0, 0]);
                        embed.setImage(pr.img);

                        message.channel.send({
                            embed
                        });

                    });

                }

                if (command[0] == "info") {

                    const embed = new Discord.RichEmbed();
                    embed.setTitle("Davvo – Commands, Rules and Info");
                    embed.setDescription(pr.alt);
                    embed.setFooter('This XKCD was brought to you by Davvo', 'http://charliebritton.me/IMG_0057.JPG');
                    embed.setColor([255, 0, 0]);
                    embed.setImage(pr.img);

                    message.channel.send({
                        embed
                    });

                }

            }

            if(message.content == "/dr") {
                let map = mark.map(history);
                let gen_message = mark.create(map) || "`nothing`";

                if(gen_message.split(" ")[0].split("")[0] == "/" || gen_message.split(" ")[0].split("")[0] == ";" || gen_message.split(" ")[0].split("")[0] == "?") {
                    gen_message = `\`${gen_message}\``;
                }

                console.log(`${colors.blue}- Created message:${colors.end} ${colors.pink}${gen_message}${colors.end}`);
                message.channel.send(gen_message);
            }

        })
        .catch(console.error);


});

client.login(priv.discord);
