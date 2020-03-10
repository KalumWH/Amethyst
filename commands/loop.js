const { MessageEmbed } = require('discord.js');
const { client, loops } = require('../app.js');

module.exports.run = async (client, message, args) => {
    let embed = new MessageEmbed().setTimestamp();
    if(!client.player.get(message.guild.id)) {
        embed.setTitle('Failed')
             .setDescription(':x: **Nothing is being played**')
        return message.channel.send(embed);
    }

    if(!loops[message.guild.id]) loops[message.guild.id] = 0;

    if(!args[0]) {
        embed.setTitle('Invalid args')
             .setDescription('**You did not provide a valid option**\n\nDisable loop: \`^loop off\`\nLooping song: \`^loop song\`\nLooping Queue: \`^loop queue\`')
        message.channel.send(embed);
    } else {
        var ar = args[0].toLowerCase();
        if(ar == '0' || ar == 'off') {
            loops[message.guild.id] = 0;
            embed.setTitle('Success')
                 .setDescription(':white_check_mark: **Loop disabled**')
            message.channel.send(embed);
        } else if(ar == '1' || ar == 'one' || ar == 'song') {
            loops[message.guild.id] = 1;
            embed.setTitle('Success')
                 .setDescription(':repeat_one: **Looping the current song**')
            message.channel.send(embed);
        } else if(ar == '2' || ar == 'multi' || ar == 'all' || ar == 'queue') {
            loops[message.guild.id] = 2;
            embed.setTitle('Success')
                 .setDescription(':repeat: **Looping the queue**')
            message.channel.send(embed);
        } else {
            embed.setTitle('Invalid args')
                 .setDescription('**The argument you provided is not a valid option**\n\nDisable loop: \`^loop off\`\nLooping song: \`^loop song\`\nLooping Queue: \`^loop queue\`')
            message.channel.send(embed);
        }
    }
}
module.exports.help = {
    name: "loop"
}