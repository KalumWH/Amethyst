const fs = require('fs');
const discord = require('discord.js');
const { client } = require(process.cwd() + '/app.js');

module.exports = (client) => {
	// EVENTS
	fs.readdir(process.cwd() + '/handlers/events/', (err, files) => {
		if (err) console.error(err);
		let handlerFiles = files.filter(f => f.split(".").pop() === "js");
    if(handlerFiles.length <= 0) {
    	return console.log(`[${timestamp}] [EVENTS]   No events loaded`);
    }
    console.log(`[${timestamp}] [EVENTS]   ${handlerFiles.length} event${handlerFiles.length > 1 ? 's' : ''} loaded`)
		handlerFiles.forEach(file => {
			require(`${process.cwd()}/handlers/events/${file}`);
		})
	});
}
