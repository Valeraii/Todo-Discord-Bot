const { SlashCommandBuilder} = require('discord.js');
const TodoList = require('../../models/todoList');
const TodoItem = require('../../models/todoItem');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('displayitems')
		.setDescription('List tasks in todo list')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('The name of the list')
				.setRequired(true)),
	async execute(interaction) {
		const todoListName = interaction.options.getString('name');
        const todoList = await TodoList.findOne({where: {name: todoListName}});
        if (!todoList) {
			return interaction.reply('The specified todo list does not exist.');
		}
    
        const list = await TodoItem.findAll({ where: {TodoListId: todoList.id} });
	    const listString = list.map(t => t.task).join('\n ');

	    return interaction.reply(`Todo List: ${todoListName} \n ${listString}`);
	},
};