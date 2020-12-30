module.exports = {
    name: 'clear',
    description: "clears messages",
    async execute(message, args) {
        if (!args[0]) return message.reply("Please enter the amount you messages you want ot clear");
        if (isNaN(args[0])) return message.reply("Please enter a number");

        if (args[0] > 100) return message.reply("You can not delete more than 100 messages");
        if (args[0] < 1) return message.reply("You must delete at least one message");

        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
        });

    }
}