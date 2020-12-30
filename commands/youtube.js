module.exports = {
    name: 'youtube',
    description: "sends youtube link",
    execute(message, args){

        if(message.member.roles.cache.has('709966372234592326')) {
            message.channel.send('https://youtube.com/pewdiepie');

        }else {
            message.channel.send('You cant run this shit fam, let me add the perms');
            message.member.roles.add('709966372234592326');

        }
    }
}