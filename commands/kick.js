module.exports = {
    name: 'kick',
    description: "kick members",
    execute(message, args){
        if(message.member.roles.cache.has('785678713710051380')) {
            const member = message.mentions.users.first();
            if (member) {
                const memberTarget = message.guild.members.cache.get(member.id);
                memberTarget.ban();
                message.channel.send("User has been kicked");

            } else {
                message.channel.send("You couldn't kick that member");
            }

        }else {
            message.channel.send('You do not have permission to run this command');
        }



    }
}