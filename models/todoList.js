const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite', // You can use a different database dialect if needed
  storage: 'database.sqlite', // Specify the path to your SQLite database file
});

const TodoItem = require('./todoItem');

// Define the TodoList model
const TodoList = sequelize.define('TodoList', {
  name: {
    type: DataTypes.STRING, 
    allowNull: false,
    unique: true, 
  },
});

TodoList.hasMany(TodoItem, {
    foreignKey: 'TodoListId'
});

// Synchronize the models with the database
sequelize.sync()
  .then(() => {
    console.log('Models are synchronized with the database.');
  })
  .catch((error) => {
    console.error('Error synchronizing models:', error);
  });

module.exports = TodoList;