const db = require('./db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer')

// Start server after DB connection
db.connect(err => {
    if (err) throw err
    console.log('Database connected.');
    startPrompt()
});

// initialize the command line prompt for users 
const startPrompt = () => {
    const promptQuestions = [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee's Role",
        "Quit Prompt",
    ];
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Start tracking your employees.",
            choices: promptQuestions,
        },
    ])
        .then(({ choice }) => {
            switch (choice) {
                case "View Departments":
                    showDepartments()
                    break;
                case "View Roles":
                    showRoles()
                    break;
                case "View Employees":
                    showEmployees()
                    break;
                case "Add a Department":
                    newDepartment()
                    break;
                case "Add a Role":
                    newRole()
                    break;
                case "Add an Employee":
                    newEmployee()
                    break;
                case "Update an Employee's Role":
                    updateEmployeeRole()
                    break;
                case "Close application.":
                    process.exit();
            }
        });
};

// show the departments table 
const showDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err
        }
        console.table(rows)
        startPrompt()
    });
}

// show the roles table
const showRoles = () => {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.table(rows)
        startPrompt()
    });
}

// show the employee table
const showEmployees = () => {
    const sql = `SELECT * FROM employee`;
    
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.table(rows)
        startPrompt()
    });
}

// insert into the deparment table 
const newDepartment = () => {
    inquirer
        .prompt({
            type: 'input',
            name: 'newDepartment',
            message: 'What is the name of this new department?'
        })
        .then(answers => {
            const sql = `INSERT INTO department (department_name) VALUES (?)`;
            const params = [
                answers.newDepartment,
            ];

            db.query(sql, params, (err, result) => {
                if (err) {
                    throw err
                }
                console.log('Your new department as been added')
                startPrompt()

            });
        })
}

// insert into the role table
const newRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of this new role?',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please enter a title for this role!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary of this role?",
            validate: salaryInput => {
                if (!salaryInput) {
                    console.log("Please enter a salary for this roles!");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'department_id',
            message: "What is the deparment ID for this role?",
            validate: department_idInput => {
                if (!department_idInput) {
                    console.log("Please enter the department ID!")
                    return false;
                } else {
                    return true;
                }
            }
        },
    ])
        .then(answers => {
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
            const params = [
                answers.title,
                answers.salary,
                answers.department_id
            ];
            db.query(sql, params, (err, result) => {
                if (err) {
                    throw err
                }
                console.log('A new role has been added')
                startPrompt()
            });
        })
}

// insert into the employee table 
const newEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the new employee?',
            validate: first_nameInput => {
                if (first_nameInput) {
                    return true;
                } else {
                    console.log("Please enter a first name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the last name of the employee ?",
            validate: last_nameInput => {
                if (!last_nameInput) {
                    console.log("Please enter a last name!");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'roles_id',
            message: "Please enter the id of the employees role",
            validate: roles_idInput => {
                if (!roles_idInput) {
                    console.log("Please enter the employees role ID!")
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "What is the id of this employee's manager?",
            validate: manager_idInput => {
                if (!manager_idInput) {
                    console.log("Please enter the employees manager ID!")
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
        .then(answers => {
            const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)`;
            const params = [
                answers.first_name,
                answers.last_name,
                answers.roles_id,
                answers.manager_id
            ];
            db.query(sql, params, (err, result) => {
                if (err) {
                    throw err
                }
                console.log('A new employee has been added')
                startPrompt()
            });
        })
}

const updateEmployeeRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the updated role id for this employee?',
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log("You must enter the employee ID!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roles_id',
            message: "Enter the ID for the new role",
            validate: roles_idInput => {
                if (!roles_idInput) {
                    console.log("Please enter the updated role ID!");
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
        .then(answers => {
            const sql = `UPDATE employee SET roles_id= ? WHERE id= ?`;
            const params = [

                answers.roles_id,
                answers.id,
            ];
            db.query(sql, params, (err, result) => {
                if (err) {
                    throw err
                }
                console.log('Your employee has been updated')
                startPrompt()
            });
        })
}
