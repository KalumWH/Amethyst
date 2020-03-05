const { MessageEmbed } = require('discord.js');
const { client, queues, loops } = require('../app.js');

module.exports.run = async (client, message, args) => {
    let embed = new MessageEmbed().setTimestamp();
    let getQueue = (server) => {
		if(!queues[server]) queues[server] = [];
		return queues[server];
    }
    let getYTLength = (millisec) => {
        var seconds = (millisec / 1000).toFixed(0);
        var minutes = Math.floor(seconds / 60);
        var hours = "";
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        if (hours != "") {
            return hours + ":" + minutes + ":" + seconds;
        }
        return minutes + ":" + seconds;
    }
    var queue = getQueue(message.guild.id);
    if(!queue || queue.length == 0) {
        embed.setTitle('Failed')
             .setDescription('**No music is playing**')
        return message.channel.send(embed);
    }
    if (!message.member.voice.channel.id) {
        embed.setTitle('Failed')
             .setDescription(':x: **Please join a voice channel first**')
        return message.channel.send(embed);
    }
    if (client.player.get(message.guild.id) && message.member.voice.channel.id !== message.guild.members.cache.get(message.guild.me.id).voice.channel.id) {
        let newEmbed = new MessageEmbed().setTitle('Failed')
             .setDescription(':x: **You\'re not in the playing voice channel!**')
        return message.channel.send(newEmbed);
    }
    var pos = args[0] * 1000;
    if(!pos || pos.length < 1) {
        embed.setTitle('Failed')
             .setDescription(':x: **You must define a position in seconds**')
        return message.channel.send(embed);
    }
    let done_embed = new MessageEmbed()
        .setTimestamp()
        .setTitle('Success')
        .setDescription(`⏩ **Position set to** \`${getYTLength(pos)}\``)
    message.channel.send(done_embed);
    client.player.get(message.guild.id).seek(pos);
}
module.exports.help = {
    name: "seek"
}