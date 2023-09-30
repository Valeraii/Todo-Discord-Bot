const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite', // You can use a different database dialect if needed
  storage: 'database.sqlite', // Specify the path to your SQLite database file
});

const TodoList = require('./todoList');

// Define the TodoItem model
const TodoItem = sequelize.define('TodoItem', {
    task: {
        type: Sequelize.STRING,  
        allowNull: false,
        unique: true
    },
});


// Synchronize the models with the database
sequelize.sync()
.then(() => {
  console.log('Models are synchronized with the database.');
})
.catch((error) => {
  console.error('Error synchronizing models:', error);
});

module.exports = TodoItem;