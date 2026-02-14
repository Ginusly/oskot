const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Display info about a user.')
        .addUserOption(option => option.setName('target').setDescription('The user')),
    async execute(interaction) {
        const target = interaction.options.getUser('target') || interaction.user;
        const member = await interaction.guild.members.fetch(target.id);

        await interaction.reply(`User info: ${target.username}\nID: ${target.id}\nJoined: ${member.joinedAt}`);
    },
};
