const fs = require('fs');
const discord = require('discord.js');
const { client } = require(process.cwd() + '/app.js');

module.exports = (client) => {
	// COMMANDS
	fs.readdir(process.cwd() + "/commands/", async (err, files) => {
	    if (err) console.error(err);
	    let command_files = files.filter(f => f.split(".").pop() === "js");
	    if (command_files.length <= 0){
			console.log(`[${timestamp}] [COMMANDS] No commands have been found.`);
	        return;
	    }
	    console.log(`[${timestamp}] [COMMANDS] ${command_files.length} command${command_files.length > 1
				? 's'
				: ''} loaded`)
	    command_files.forEach((f, i) => {
				let command = require(`${process.cwd()}/commands/${f}`);
				client.commands.set(command.help.name, command);
	    });
	});

};
