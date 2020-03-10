const { client } = require(process.cwd() + '/app.js');

client.on('error', (error, channel_id) => {
  if (!error) return 'Provide an error message or variable';
  if (!channel_id) {
    console.log(error);
    return 'Logged error message to console';
  }
  let channel = client.channels.cache.get(channel_id);
  return channel.send('\`\`\`xl\n' + error + '\`\`\`');
})
