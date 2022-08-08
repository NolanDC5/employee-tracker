const inquirer = require('inquirer');
const db = require ("./db/connection.js");
const consoleTable = require('console.table')

function userPrompt() {
    return inquirer.prompt([
        {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
        'View Departments', 
        'View Roles', 
        'View Employees', 
        'Add Department', 
        'Add Role', 
        'Add Employee', 
        'Update Employee Role'
        ],

        }
    
    ]).then(data => {
       switch(data.userPrompt) {
           case 'View Departments':
            viewDepartments();
            break;
           case 'View Roles':
            viewRoles();
            break;
           case 'View Employees':
            viewEmployees();
            break;     
           case 'Add Department':
            addDepartment();
            break;
           case 'Add Role':
            addRole();
            break;
           case 'Add Employee':
            addEmployee();
            break;
           case 'Update Employee Role':
            updateRole();
            break;    
       }
    });    
};

function viewDepartments() { db.query({sql:'SELECT * FROM departments'}, (errors, results) => {
    if(errors) {console.log(errors.message)};
    console.table(results);
    userPrompt();
});
};

function viewRoles() { db.query({sql:'SELECT * FROM roles'}, (errors, results) => {
    if(errors) {console.log(errors.message)};
    console.table(results);
    userPrompt();
});
};

function viewEmployees() { db.query({sql:'SELECT * FROM employees'}, (errors, results) => {
    if(errors) {console.log(errors.message)};
    console.table(results);
    userPrompt();
});
};

function addDepartment() {
    return inquirer.prompt(
        {
            type: 'input',
            name: 'departmentName',
            message: 'What will be the name of the Department?'
        }
    ).then(data => {
        const dpName = data.departmentName;
        const sql = `INSERT INTO departments (name)
                    VALUES
                    (?)`;
        db.query(sql, dpName, (errors, results) => {
            
            if(errors){console.log(errors.message)};
        
        console.table(results);
        console.log('Department added');
     });
     userPrompt();
    });  
};

function addRole() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the new role?'
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary of the new role?'
        },
        {
            type: 'number',
            name: 'department_id',
            message: 'What is the department ID for the new role?'
        }
    ]).then(data => {
        
        db.query({sql: `INSERT INTO roles (title, salary, department_id)
        VALUES
        ('${data.title}', ${data.salary}, ${data.department_id});`}, (errors, results) => {
            if(errors){
                console.log(errors.message);
                return;
            };
        
        console.table(results);
        console.log('Role added');
     });
     userPrompt();
     }); 
}

function addEmployee() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the new employees name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is their last name?'
        },
        {
            type: 'number',
            name: 'roles_id',
            message: 'What is the role ID for the new employee?'
        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'What will their manager ID be?'
        },
    ])
    .then(data => {
        db.query({sql: `INSERT INTO employees (first_name, last_name, roles_id, manager_id)
        VALUES
            ('${data.first_name}', '${data.last_name}', ${data.roles_id}, ${data.manager_id});`}, (errors, results) => {
                if(errors) {
                    console.log(errors.message);
                    return;
                }
                console.table(results);
                console.log('Employee added');
             });
             userPrompt();
     });
}

function updateRole() {
    return inquirer.prompt([
        {
            type: 'number',
            name: 'employeeId',
            message: 'What is the ID of the employee whose role you would like to update?'
        },
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the ID of the role you would like to update?'
        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'What is the manager ID of the employee you would like to update?'
        },
    ]).then(data => {
            db.query({sql:`UPDATE employees
            SET roles_id = ${data.newRole}, manager_id = ${data.manager_id}
            WHERE id = ${data.employeeId}`}, (err, results) => {
                if(err) {
                    console.log(err.message)
                    return;
                }
                console.table(results);
                console.log('Role added');
                userPrompt();
            })
            
        })
}

userPrompt ();

        
