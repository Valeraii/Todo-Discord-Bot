// const { STRING } = require('sequelize');
// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const TodoList = sequelize.define('todoList', {
// 	listName: {
// 		type: Sequelize.STRING,
// 		unique: true,
//         allowNull: false
// 	},
// });

// const TodoItems = sequelize.define('todoItems', {
//     itemName: {
//         type: Sequelize.STRING,  
//         allowNull: false
//     },
//     priority: {
//         type: Sequelize.STRING,
//         validate: {
//             isIn: [['high', 'medium', 'low']],
//             msg: "Options: high, medium, low"
//         }
//     },
//     complete: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: false
//     }
// })

// TodoList.hasMany(TodoItems, {as: "items"});
// TodoItems.belongsTo(TodoList)


const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite', // You can use a different database dialect if needed
  storage: 'database.sqlite', // Specify the path to your SQLite database file
});

// Define the TodoList model
const TodoList = sequelize.define('TodoList', {
  name: {
    type: DataTypes.STRING, // You can adjust the data type based on your needs
    allowNull: false,
    unique: true, // Ensures each todo list has a unique name
  },
});

module.exports = TodoList;