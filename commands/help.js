const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {
    // const commands = client.commands.map(r => r.help.name).join(', ');
    let regularCommands = [
        "help - This command",
        "ping - The connection to Discord API in ms"
    ];
    let musicCommands = [
        "clear - Clears the queue and disconnects the bot",
        "disconnect - Disconnect the bot from the VC",
        "join - Add the bot to the VC",
        "loop - Enable/disable a loop for the song/queue",
        "np - Check the currently playing song",
        "pause - Pause playback",
        "play - Play / add a song to the queue",
        "queue - Display the current queue",
        "resume - Resume playback",
        "seek - Skip to a specific point in a song",
        "skip - Skip 1 or more songs",
        "volume - Change the volume"
    ];
    let lockedCommands = [
        "eval - Evaluate arbituary code"
    ]
    const embed = new MessageEmbed()
        .setTitle(client.user.username + ' commands')
        .setDescription('Prefix \`^\`')
        .addFields({ name: "Regular", value: regularCommands.join('\n') })
        .addFields({ name: "Music", value: musicCommands.join('\n') })
        .addFields({ name: "Locked", value: lockedCommands.join('\n') })
        .setTimestamp()
    return message.channel.send(embed);

}
module.exports.help = {
    name: "help"
}