const { client, timestamp } = require(process.cwd() + '/app.js');

client.on('ready', () => {
	client.user.setActivity('great music', {
		type: 'LISTENING'
	});
	console.log(`[${timestamp}] [API]      Successfully connected to discord API`);
	console.log(`[${timestamp}] [NODE]     Node.js up and running @${process.version}`);
	console.log(`[${timestamp}] [WRAPPER]  Discord.js wrapper up and running @v${require('discord.js').version}`);
	console.log(`[${timestamp}] [CLIENT]   Logged in as ${client.user.username}`);
	console.log(`[${timestamp}] [CLIENT]   Connected with ${client.guilds.cache.size} guild${client.guilds.cache.size > 1 ? 's' : ''} and ${client.users.cache.size} user${client.users.cache.size > 1 ? 's' : ''}`);
	console.log(`[${timestamp}] [STATUS]   Online!`);
});
