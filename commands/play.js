const { MessageEmbed } = require('discord.js');
const { URLSearchParams } = require("url");
const { client, queues, loops } = require('../app.js');
const config = require('../config.json');
const axios = require("axios");

module.exports.run = async (client, message, args) => {
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
    const defaultRegions = {
        asia: ["sydney", "singapore", "japan", "hongkong"],
        eu: ["london", "frankfurt", "amsterdam", "russia", "eu-central", "eu-west"],
        us: ["us-central", "us-west", "us-east", "us-south", "brazil"]
    };
    let getQueue = (server) => { // Get da queue!
		if(!queues[server]) queues[server] = [];
		return queues[server];
    }
    let getSong = async (string) => {
		return new Promise(async(resolve, rej) => {
			try {
                const node = client.player.nodes.first();
                const params = new URLSearchParams();
                params.append("identifier", string);
                const res = await axios.get(`http://${node.host}:${node.port}/loadtracks?${params.toString()}`, {
                    headers: {
						Authorization: node.password
					}
                });
				resolve(res.data.tracks);
			} catch (e) {
				resolve(e);
			}
		});
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
    let getRegion = (client, region) => {
        region = region.replace("vip-", "");
        for (const key in defaultRegions) {
            const nodes = client.player.nodes.filter(node => node.connected && node.region === key);
            if (!nodes) continue;
            for (const id of defaultRegions[key]) {
                if (id === region || region.startsWith(id) || region.includes(id)) return key;
            }
        }
        return "europe";
    }
    let getIdealHost = (client, region) => {
        region = getRegion(client, region);
        const foundNode = client.player.nodes.find(node => node.ready && node.region === region);
        if (foundNode) return foundNode.host;
        return client.player.nodes.first().host;
    }
    let execQueue = async (message, queue, player) => {
        player.play(queue[0].track);
        const embed = new MessageEmbed().setTimestamp();
        embed.setTitle('🎵 Now playing!')
            .setThumbnail(`https://i.ytimg.com/vi/${queue[0].info.identifier}/hqdefault.jpg`)
            .addFields({
                name: "Author", value: queue[0].info.author }, {
                name: "Song Name", value: queue[0].info.title }, {
                name: "Length", value: queue[0].info.isStream ? 'Livestream' : getYTLength(queue[0].info.length)
            })
        message.channel.send(embed);
        player.once('end', async () => {
            if(!loops[message.guild.id] || loops[message.guild.id] == 0)
                queue.shift();
            else if(loops[message.guild.id] == 2) {
                queue.push(queue[0]);
                queue.shift();
            }
            if(queue.length > 0) {
                setTimeout(() => {
                    execQueue(message, queue, player);
                }, 1000);
            } else {
                const empty = new MessageEmbed()
                    .setTitle('🎵 Queue empty')
                    .setDescription('ℹ️ **No more songs in the queue to play**\nThe bot will now disconnect from the voice channel')
                    .setTimestamp()
                message.channel.send(empty);
                await client.player.leave(message.guild.id);
                delete queues[message.guild.id];
                if(loops[message.guild.id])
                    delete loops[message.guild.id];
            }
        });
    }
    const embed = new MessageEmbed().setTimestamp();
    const betterArgs = args.join(' ');
    let canPlay = false;
    if(client.player.get(message.guild.id) && client.player.get(message.guild.id).paused) music.resume(message, suffix);
    if (!betterArgs && !client.player.get(message.guild.id)) {
        embed.setTitle('Incorrect args')
             .setDescription(':x: **Provide a song to play**')
        return message.channel.send(embed);
    }
    let queue = getQueue(message.guild.id);
    let track = await getSong(betterArgs.startsWith(`http`) ? betterArgs : `ytsearch:${betterArgs}`);
    if (track instanceof Error) {
        embed.setTitle('Failed')
             .setDescription(`:x: **Track search failed with error**\n\`\`\`xl\n${track.toString()}\n\`\`\``)
        return message.channel.send(embed);
    }
    const urlParams = new URLSearchParams(args.join(' '));
    const myParam = parseInt(urlParams.get('index'));
    if (!track[0]) {
        embed.setTitle('Failed')
             .setDescription(':x: **No results found**')
        return message.channel.send(embed);
    }
    if (!queue[0]) canPlay = true;
    if (urlParams.get('list') && myParam) {
        track = track.splice(myParam - 1, track.length);
        track.forEach((cr) => {
            queue.push(cr);
        });
    } else if (urlParams.get('list')) {
        track.forEach((cr) => {
            queue.push(cr);
        });
    } else {
        queue.push(track[0]);
    }
    message.channel.send({embed: new MessageEmbed()
        .setTitle(`:musical_note: Added ${urlParams.get('list') ? "a playlist" : "the song"} to queue`)
        .setThumbnail(`https://i.ytimg.com/vi/${track[0].info.identifier}/hqdefault.jpg`)
        .addFields({
            name: "Author", value: track[0].info.author }, {
            name: "Song Name", value: `[${track[0].info.title}](${track[0].info.uri})` }, {
            name: "Length", value: track[0].info.isStream ? 'Livestream' : getYTLength(track[0].info.length)
        })
    }) 
    if (canPlay) {
        let theHost = getIdealHost(client, message.guild.region);
        const player = await client.player.join({
            guild: message.guild.id,
            channel: message.member.voice.channel.id,
            host: theHost
        });
        client.player.get(message.guild.id).node = client.player.nodes.get(theHost);
        execQueue(message, queue, player);
    }
}
module.exports.help = {
    name: "play"
}