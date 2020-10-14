const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const logo = require('asciiart-logo');
var clear = require('clear');

require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME
});

clear();

function appLogo() {
  console.log(logo({ name: 'Employee Tracker', }).render());
  console.log('connected as id ' + connection.threadId);
  console.log("you are connected to the Employee Tracker Database");
}

connection.connect(err => {
  if (err) throw err;
  appLogo();
  navQuestions()
});

function navQuestions() {
  console.log('\n');
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update Employee's Role",
        "EXIT APPLICATION",
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Departments":
          clear();
          appLogo();
          viewDepartments();
          break;

        case "View All Roles":
          clear();
          appLogo();
          viewRoles();
          break;

        case "View All Employees":
          clear();
          appLogo();
          viewEmployees();
          break;

        case "Add a Department":
          clear();
          appLogo();
          addDepartment();
          break;

        case "Add a Role":
          clear();
          appLogo();
          addRole();
          break;

        case "Add an Employee":
          clear();
          appLogo();
          addEmployee();
          break;

        case "Update Employee's Role":
          clear();
          appLogo();
          updateEmployeeRole();
          break;

        case "EXIT APPLICATION":
          exit();
          break;
      }
    });

}

function viewDepartments() {
  console.log('\n');
  connection.query(
    `SELECT id AS Dept_ID, name AS Department_Name FROM department`,
    function (err, result) {
      if (err) throw err;
      console.table(result);
      navQuestions();
    });
}

function addDepartment() {
  console.log('\n');
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Would you like to add a NEW department?",
      choices: ["Yes", "No",]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Yes":
          connection.query(
            `SELECT id AS Dept_ID, name AS Department_Name FROM department`,
            function (err, result) {
              if (err) throw err;
              console.log('\n');
              console.table(result);
              inquirer
                .prompt({
                  name: "newDepartment",
                  type: "input",
                  message: "What is the name of the new department to be added?",
                  validate: newDepartmentInput => {
                    if (newDepartmentInput) {
                      return true;
                    } else {
                      console.log('Try again buddy');
                      return false;
                    }
                  }
                })
                .then(function (response) {
                  connection.query(
                    'INSERT INTO department SET name = ?',
                    [
                      response.newDepartment
                    ],
                    function (err, res) {
                      if (err) throw err;
                      clear();
                      appLogo();
                      console.log('\n' + response.newDepartment + ' has been added as a new department.');
                      navQuestions();
                    })
                })
            });
          break;
        case "No":
          clear();
          appLogo();
          navQuestions();
          break;
      }
    });
};

function viewRoles() {
  console.log('\n');
  connection.query(
    `SELECT roles.id AS Role_ID, roles.title AS Job_Title, department.name AS Department_Name, roles.salary
      FROM roles
      LEFT JOIN department ON roles.department_id = department.id`,
    function (err, result) {
      if (err) throw err;
      console.table(result);
      navQuestions();
    });
}

function addRole() {
  console.log('\n');
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Would you like to add a NEW Role?",
      choices: ["Yes", "No",]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Yes":
          connection.query(
            `SELECT roles.id AS Role_ID, roles.title AS Job_Title, department.name AS Department_Name, roles.salary
            FROM roles
            LEFT JOIN department ON roles.department_id = department.id`,
            function (err, result) {
              if (err) throw err;
              console.table(result);
              inquirer
                .prompt([
                  {
                    name: "newRoleName",
                    type: "input",
                    message: "What is the name of the new role to be added?",
                    validate: newRoleNameInput => {
                      if (newRoleNameInput) {
                        return true;
                      } else {
                        console.log('Try again buddy');
                        return false;
                      }
                    }
                  },
                  {
                    name: "newRoleSalary",
                    type: "input",
                    message: "What is the Salary of the new role?",
                    validate: newRoleSalaryInput => {
                      if (newRoleSalaryInput) {
                        return true;
                      } else {
                        console.log('Try again buddy');
                        return false;
                      }
                    }
                  },
                  {
                    name: "newRoleDepartment",
                    type: "input",
                    message: "Enter the Department ID that this role belongs to?",
                    validate: newRoleDepartmentInput => {
                      if (newRoleDepartmentInput) {
                        return true;
                      } else {
                        console.log('Try again buddy');
                        return false;
                      }
                    }
                  }
                ])
                .then(function (response) {
                  connection.query(
                    `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`,
                    [
                      response.newRoleName,
                      response.newRoleSalary,
                      response.newRoleDepartment
                    ],
                    function (err, res) {
                      if (err) throw err;
                      clear();
                      appLogo();
                      console.log('\n' + response.newRoleName + ' has been added as a new role.');
                      navQuestions();
                    })
                })
            });
          break;

        case "No":
          clear();
          appLogo();
          navQuestions();
          break;
      }
    });
};


function viewEmployees() {
  console.log('\n');
  connection.query(
    `SELECT 
      employee.id AS Employee_ID, employee.first_name, employee.last_name, roles.title AS Job_title, 
      department.name AS Department, roles.salary AS Salary, CONCAT (m.first_name,' ',m.last_name) AS Manager
      FROM employee
      LEFT JOIN roles ON employee.role_id = roles.id
      LEFT JOIN department on roles.department_id = department.id
      LEFT JOIN employee m ON m.id = employee.manager_id`,
    function (err, result) {
      if (err) throw err;
      console.table(result);
      navQuestions();
    });
}

function addEmployee() {
  console.log('\n');
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Would you like to add a NEW Employee?",
      choices: ["Yes", "No",]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Yes":
          inquirer
            .prompt([
              {
                name: "newFirstName",
                type: "input",
                message: "What is the new employees first name?",
                validate: newFirstNameInput => {
                  if (newFirstNameInput) {
                    return true;
                  } else {
                    console.log('Try again buddy');
                    return false;
                  }
                }
              },
              {
                name: "newLastName",
                type: "input",
                message: "What is the new employees last name?",
                validate: newLastNameInput => {
                  if (newLastNameInput) {
                    return true;
                  } else {
                    console.log('Try again buddy');
                    return false;
                  }
                }
              },
              {
                name: "newEmployeeRole",
                type: "input",
                message: "Enter the new employees role ID?",
                validate: newEmployeeRoleInput => {
                  if (newEmployeeRoleInput) {
                    return true;
                  } else {
                    console.log('Try again buddy');
                    return false;
                  }
                }
              },
              {
                name: "newEmployeeManager",
                type: "input",
                message: "What is the Employee ID of the new employees Manager?",
                validate: newEmployeeManagerInput => {
                  if (newEmployeeManagerInput) {
                    return true;
                  } else {
                    console.log('Try again buddy');
                    return false;
                  }
                }
              }
            ])
            .then(function (response) {
              connection.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
                [
                  response.newFirstName,
                  response.newLastName,
                  response.newEmployeeRole,
                  response.newEmployeeManager
                ],
                function (err, res) {
                  if (err) throw err;
                  clear();
                  appLogo();
                  console.log('\n' + response.newFirstName + " " + response.newLastName + ' has been added as a new employee.');
                  navQuestions();
                })
            });
          break;
        case "No":
          clear();
          appLogo();
          navQuestions();
          break;
      }
    })

}

function updateEmployeeRole() {
  console.log('\n');
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Would you like to update an employees role?",
      choices: ["Yes", "No",]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Yes":
          connection.query(
            `SELECT 
                  employee.id AS Employee_ID, employee.first_name, employee.last_name, roles.id AS Role_ID, roles.title AS Job_title, department.name AS Department
            FROM employee
            LEFT JOIN roles ON employee.role_id = roles.id
            LEFT JOIN department on roles.department_id = department.id`,
            function (err, result) {
              if (err) throw err;
              console.table(result);
              inquirer
                .prompt([
                  {
                    name: "employeeId",
                    type: "input",
                    message: "What is the ID of the employee whose role will be changed?",
                    validate: employeIDInput => {
                      if (employeIDInput) {
                        return true;
                      } else {
                        console.log('Try again buddy');
                        return false;
                      }
                    }
                  },
                  {
                    name: "employeeNewRole",
                    type: "input",
                    message: "What is the employees NEW Role?",
                    validate: employeeNewRoleInput => {
                      if (employeeNewRoleInput) {
                        return true;
                      } else {
                        console.log('Try again buddy');
                        return false;
                      }
                    }
                  }
                ])
                .then(function (response) {
                  connection.query(
                    `UPDATE employee SET role_id = ? WHERE id = ?`,
                    [
                      response.employeeNewRole,
                      response.employeeId
                    ],
                    function (err, res) {
                      if (err) throw err;
                      clear();
                      appLogo();
                      console.log('\n Employee ID ' + response.employeeId + " has been updated to role " + response.employeeNewRole + '.');
                      navQuestions();
                    })
                });
            });
          break;
        case "No":
          clear();
          appLogo();
          navQuestions();
          break;
      }
    });
}


function exit() {
  clear();
  connection.end();
  return process.exit(0);
}
