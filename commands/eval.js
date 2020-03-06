const discord = require("discord.js");
const config = require('../config.json');
const { client, queues, loops, timestamp, prefix, ksoft } = require('../app.js');

module.exports.run = async (client, message, args) => {
  const player = client.player.get(message.guild.id);
  if (message.author.id !== config.owner) {
    return;
  }
  let argresult = args.join(' ');
  if (!argresult) {
    return message.channel.send("Please provide some arbituary code to run");
  }
  try {
    let evaled = eval(argresult);
    // const { flagArgs } = message;
    // if ('silent' in message.flagArgs) return null;
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
    if (evaled.includes(config.token)) evaled = '[REDACTED]';
    let evalResponse = [
      '**Output**:',
      `\`\`\`js\n${evaled}\`\`\``,
      '**Type**:',
      `\`\`\`js\n${typeof evaled}\`\`\``,
      `:stopwatch: ${client.ws.ping}ms`
    ];
    return message.channel.send(evalResponse.join('\n'));
  } catch (err) {
    let evalErrorResponse = [
      '**Output**:',
      `\`\`\`js\n${err.stack}\`\`\``,
      '**Type**:',
      `\`\`\`js\n${err.name}\`\`\``,
      `:stopwatch: ${Math.round(client.ws.ping)}ms`
    ];
    return message.channel.send(evalErrorResponse.join('\n'));
  }
}
module.exports.help = {
  name: "eval"
}
