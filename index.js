const db = require('./db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer')

// Connect to the server
db.connect(err => {
  if (err) throw err
  console.log('Database connected.');
  initalQuestions()
});