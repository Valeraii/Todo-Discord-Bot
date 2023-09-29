const { SlashCommandBuilder } = require('discord.js');
const TodoList = require('C:/Users/valer/Desktop/projects/discord bot/models/todoList.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deletelist')
		.setDescription('Delete a todo list')
        .addStringOption(option =>
			option.setName('name')
				.setDescription('The name of the list you want to delete')
				.setRequired(true)),
	async execute(interaction) {
		const listName = interaction.options.getString('name');
        // equivalent to: DELETE from tags WHERE name = ?;
        const rowCount = await TodoList.destroy({ where: { name: listName } });

        if (!rowCount) return interaction.reply('That list doesn\'t exist.');

        return interaction.reply('List deleted.');
	},
};