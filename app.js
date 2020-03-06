const { PlayerManager } = require("./src/index");
const { KSoftClient } = require('@aero/ksoft');
const { Client } = require("discord.js");
const config = require('./config.json');
const discord = require('discord.js');

// Global variables
global.timestamp = new Date().toLocaleTimeString();

// Other
console.log(`[${timestamp}] [HANDLER]  Handler loaded`);

class MusicClient extends Client {
    constructor(...args) {
        super(...args);
        this.ksoft = new KSoftClient(config.api.ksoft)
        this.player = null;
        this.on("ready", () => {
            this.player = new PlayerManager(client, config.nodes, {
                user: client.user.id,
                shards: null
            });
        }).on("error", console.error).on("warn", console.warn);
    }
}

const client = new MusicClient();

let queues = {};
let loops = {};
// Collections
client.commands = new discord.Collection();
client.events = new discord.Collection();
require('./handlers/eventHandler.js')(client);
require('./handlers/commandHandler.js')(client);

//! Custom exports
module.exports = {
    client: client,
    prefix: config.prefix,
    timestamp: timestamp,
    queues: queues,
    loops: loops
};

//! Login to discord
client.login(config.token);