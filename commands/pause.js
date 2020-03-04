const { client } = require('../app.js');

module.exports.run = async (client, message, args) => {
    const player = client.player.get(message.guild.id);
    if (!player) {
        return message.channel.send(':x: Nothing playing');
    }
    await player.pause(true);
    return message.channel.send(':white_check_mark: Paused');
}
module.exports.help = {
    name: "pause"
}