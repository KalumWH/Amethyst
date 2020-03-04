const { client } = require(process.cwd() + '/app.js');

client.on('error', (error, channel) => {
  if (!error) return 'Provide an error message or variable';
  if (!channel) {
    console.log(error);
    return 'Logged error message to console';
  }
  return channel.send('\`\`\`js\n' + error + '\`\`\`');
})
