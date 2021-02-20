module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
    async execute(message, args, Discord, client) {
        const channel = '812744504963629106';
        const cloudrole = message.guild.roles.cache.find(role => role.name === "Cloud SMP");
 
        const cloudemote = ':cloud:';
 
        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('CloudSMP role')
            .setDescription('Get your CloudSMP role here if you are in the server!\n\n'
                + `${cloudemote} For role`);
 
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(cloudemote);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === cloudemote) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(cloudrole);
                }
            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === cloudemote) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(cloudrole);
                }
            } else {
                return;
            }
        });
    }
 
}   
