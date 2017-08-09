// jshint esversion: 6
const Discord = require("discord.js");
const mark = require("./mark");

const client = new Discord.Client();

let chattiness = 0.5;

client.on("ready", () => {
    console.log(`\n=== DAVVO BOT IS ALIVE ===`);
});

let command_parse = function(content, command_start) {
    let splitted = content.split(" ");

    if(splitted[0] !== command_start) {

        return false;

    } else {

        return splitted.slice(1);

    }
};

client.on(`message`, message => {
    console.log(`Message encountered.`);

    if (message.author.id === 314111470306721802) {
        return;
    }

    let history = [];

    message.channel.fetchMessages({
        limit: 100
    })
    .then(messages => {
        messages.forEach( (item, key, map) => {

            history.push(item.toString());

        });
        console.log(`The message history stored is ${history.length} long.\n`);

        let command = command_parse(message.content, "/davvo");

        if (command[0] === "reply") {

            message.channel.send( mark.create( mark.splits(history) ) );
            return;

        }

        if (command[0] === "chattiness") {

            chattiness = command[1];
            return;

        }

        if (command[0] === "info") {

            const embed = new Discord.RichEmbed()
              .setTitle("Davvo Bot – Info")
              .setDescription("All of the following commands must be prefixed with `/davvo` to work.")
              .addField("`reply`", "Speaks in the chat using the new Davvo Chatbot Engine™℠®© which learns from previous messages and generates new ones based around them. This means if everyone all of a sudden turns into Feminazis, so will I.")
              .addField("`chattiness`", "Sets how chatty I will be, ranges from 0-1. It's basically just a measure of how often I speak unprompted.")
              .addField("`info`", "Really?");

            message.channel.send({embed});

        }

        let random = Math.random();
        if (random < chattiness) {

            message.channel.send( mark.create( mark.splits(history) ) );
            return;

        }
    })
    .catch(console.error);

});

client.login('bloopetybloop');
