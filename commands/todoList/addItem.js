const { SlashCommandBuilder} = require('discord.js');
const TodoList = require('../../models/todoList');
const TodoItem = require('../../models/todoItem');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addtask')
		.setDescription('Add task to todo list')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('The name of the list')
				.setRequired(true))
        .addStringOption(option =>
                option.setName('task')
                    .setDescription('The name of the task')
                    .setRequired(true)),
	async execute(interaction) {
		const todoListName = interaction.options.getString('name');
        const taskName = interaction.options.getString('task');

        try {
            const todoList = await TodoList.findOne({where: {name: todoListName}});
            if (!todoList) {
				return interaction.reply('The specified todo list does not exist.');
			}
    
            const todoItem = await TodoItem.create({
                task: taskName,
                TodoListId: todoList.id,
            });
            return interaction.reply(`Task ${todoItem.task} added.`)
        }
        catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply('That task already exists.');
			}

			return interaction.reply('Something went wrong with adding a task.');
		}
	},
};