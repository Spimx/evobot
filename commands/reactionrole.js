module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
    async execute(message, args, Discord, client) {
        const channel = '812693159121387540';
        const cloudsmp = message.guild.roles.cache.find(role => role.name === "Cloud SMP");
 
        const cloudsmpemote = ':cloud:';
 
        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('CloudSMP Role')
            .setDescription('Get your CloudSMP role here if you are in the server!\n\n'
                + `${cloudsmpemote} for CloudSMP`
 
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(cloudsmpemote);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === yellowTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(cloudsmp);
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
                if (reaction.emoji.name === yellowTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(cloudsmp);
                }
            } else {
                return;
            }
        });
    }
 
}   