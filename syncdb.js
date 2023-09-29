const TodoList = require('./models/todoList')

TodoList.sync({alter: true});
