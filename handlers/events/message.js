const { client, prefix } = require(process.cwd() + '/app.js');

client.on('message', message => {
  let messageArray = message.content
      .replace(/ +/g, " ")
      .split(" ");
  let command = messageArray[0];
  let args = message.content
      .replace(/ +/g, " ")
      .slice(prefix.length)
      .trim()
      .split(" ");
  let cmd = args.shift().toLowerCase();
  
  if (message.content.startsWith(prefix)) {
    let args = messageArray.slice(1);
    let cmd = client.commands.get(command.slice(prefix.length));
    if (cmd) {
      cmd.run(client, message, args);
    }
  }
});
