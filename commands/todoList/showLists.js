const { SlashCommandBuilder } = require('discord.js');
const TodoList = require('C:/Users/valer/Desktop/projects/discord bot/models/todoList.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('displaylist')
		.setDescription('Show all todo lists'),
	async execute(interaction) {
		const list = await TodoList.findAll({ attributes: ['name'] });
	    const listString = list.map(t => t.name).join(', ');

	    return interaction.reply(`Todo Lists: ${listString}`);
	},
};