const { client, queues } = require('../app');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    let embed = new MessageEmbed().setTimestamp();
    let getQueue = (server) => {
        if(!queues[server]) queues[server] = [];
        return queues[server];
    };
    try {
        const player = client.player.get(message.guild.id);
        let queue = getQueue(message.guild.id);
        if(!queue || queue.length === 0) {
            embed.setTitle('Failed')
                .setDescription('**No music is playing**');
            return message.channel.send(embed);
        }
        if (!args[0]) {
            embed.setTitle('Failed')
                .setDescription(':x: **You have not provided a new value**');
            return message.channel.send(embed);
        }
        if (isNaN(args[0])) {
            embed.setTitle('Failed')
                .setDescription(':x: **The bass boost amount must be a number**');
            return message.channel.send(embed);
        }
        const bb = parseInt(args[0]) || 0;
        if (bb < 0) {
            embed.setTitle('Failed')
                .setDescription(':x: **The bass boost can\'t be lower than 0**');
            return message.channel.send(embed);
        }
        if (bb > 100) {
            embed.setTitle('Failed')
                .setDescription(':x: **The bass boost can\'t be higher than 100**');
            return message.channel.send(embed);
        }
        player.setEQ(bb);

        embed.setTitle('Success')
            .setDescription('🔊 **The bass boost has been set to** \`' + bb + '%\`');
        message.channel.send(embed);
    } catch (err) {
        message.channel.send(`**Encountered an error**\`\`\`xl\n${err.message}\n\`\`\``);
    }
};
module.exports.help = {
    name: "bb"
};