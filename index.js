/**
 * Module Imports
 */
const Discord = require('discord.js');
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./util/EvobotUtil");

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const fs = require('fs');
 
client.commands = new Discord.Collection();

/**
 * Client Events
 */
client.on("ready", () => {
  console.log(`${client.user.username} ready!`);
  client.user.setActivity(`CloudCraft`, { type: "PLAYING" });
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Members');
    
    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('793680981193523232').send(`Welcome <@${guildMember.user.id}> to Cloud Craft!`)
});

/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.").catch(console.error);
  }
  //Commands
 
 client.on('message', message => {
 
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  
  if(command === 'clear') {
    client.commands.get('clear').execute(message, args);
    //Kick
  }  else if(command === 'kick'){
    client.commands.get('kick').execute(message, args);
    //Ban
  }  else if(command === 'ban'){
    client.commands.get('ban').execute(message, args);
    //Mute
  }  else if(command === 'mute'){
    client.commands.get('mute').execute(message, args);
    //Unmute
  }  else if(command === 'unmute'){
    client.commands.get('unmute').execute(message, args);
  }  else if(command === 'play'){
    client.commands.get('play').execute(message, args);
  }  else if(command === 'leave'){
    client.commands.get('leave').execute(message, args);
  }
     else if (command === 'reactionrole') {
    client.commands.get('reactionrole').execute(message, args, Discord, client);
  }
  
});
