const { client, prefix } = require(process.cwd() + '/app.js');

client.on('messageUpdate', async (oldMessage, newMessage) => {
	let msg = newMessage.content.toUpperCase();
    let messageArray = newMessage.content.split(" ");
    let command = messageArray[0];

    let args = newMessage.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();

    if (newMessage.content.startsWith(prefix)) {
        let args = messageArray.slice(1);
        let cmd = client.commands.get(command.slice(prefix.length));
        if (cmd) cmd.run(client, newMessage, args);
    };
});