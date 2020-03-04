const { client, prefix } = require(process.cwd() + '/app.js');

client.on('message', message => {
	let msg = message.content.toUpperCase();
  let messageArray = message.content.split(" ");
  let command = messageArray[0];

  let args = message.content.slice(prefix.length).trim().split(" ");
  let cmd = args.shift().toLowerCase();

  if (message.content.startsWith(prefix)) {
    let args = messageArray.slice(1);
    let cmd = client.commands.get(command.slice(prefix.length));
    if (cmd) {
			try {
				cmd.run(client, message, args);
			} catch (e) {
				client.emit('error', e.message, message.channel);
			}
		}
  };
});
