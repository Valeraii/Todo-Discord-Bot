const { SlashCommandBuilder } = require('discord.js');
const TodoList = require('C:/Users/valer/Desktop/projects/discord bot/models/todoList.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createlist')
		.setDescription('Create todo list')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('The name of the list')
				.setRequired(true)),
	async execute(interaction) {
		const todoListName = interaction.options.getString('name');
        
        try {
            const todoList = await TodoList.create({
                name: todoListName,
            });
            return interaction.reply(`Todo list ${todoList.name} added.`)
        }
        catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply('That todo list already exists.');
			}

			return interaction.reply('Something went wrong with adding a todo list.');
		}
	},
};