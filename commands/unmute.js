module.exports = {
    name: 'unmute',
    description: "unmute members",
    execute(message, args){
        if(message.member.roles.cache.has('785678713710051380')) {
            const target = message.mentions.users.first();
            if(target){
                let mainRole = message.guild.roles.cache.find(role => role.name === 'Members');
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

                let memberTarget = message.guild.members.cache.get(target.id);


                memberTarget.roles.add(mainRole.id);
                memberTarget.roles.remove(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);

            }else{
                message.channel.send("You couldn't unmute that member");
            }

        }else{
            message.channel.send('You do not have permission to run this command');
        }


    }
}