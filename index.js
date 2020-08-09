const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: "GET YOUR OWN PASSWORD",
  database: 'employee_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    console.log("you are connected");
    employeeTracker()
  });

  function employeeTracker() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "View Employees by Manager",
          "View Employees by Department",
          "View Total Budget by Department",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update Employee's Role",
          "Update Employee's Manager",
          "DELETE - Department, Roles or Employees",
          "QUIT - EXIT APPLICATION",

        ]
      })
      .then(function(answer) {
        switch (answer.action) {
          
          case "View All Departments":
            viewDepartments();
            break;
          
            case "View All Roles":
            viewRoles();
            break;

          case "View All Employees":
            viewEmployees();
            break;
            
          case "View Employees by Manager":
            viewEmployeesByManager();
            break;

          case "View Employees by Department":
            viewEmployeesByDepartment();
            break;
            
          case "View Total Budget by Department":
            viewTotalBudgetByDepartment();
            break;

          case "Add a Department":
            addDepartment();
            break;
  
          case "Add a Role":
            addRole();
            break;
  
          case "Add an Employee":
            addEmployee();
            break;
 
          case "Update Employee's Role":
            updateEmployeeRole();
            break;
  
          case "Update Employee's Manager":
            updateEmployeeManager();
            break;

          case "Delete an Employee":
            deleteEmployee();
            break;

            case "Quit Application":
              endEmployee();
              break;
        }
      });
  }

  function viewDepartments() {
    connection.query(
      
    `SELECT id AS Dept_ID, name AS Department_Name from department`, 
    
      function(err, result) {
      if (err) throw err;
      console.table(result);
      employeeTracker();
    });
  }

  function viewRoles() {
    connection.query(

    `SELECT roles.id AS Role_ID, roles.title AS Job_Title, department.name AS Department_Name, roles.salary
      FROM roles
      LEFT JOIN department ON roles.department_id = department.id`, 
      
      function(err, result) {
        if (err) throw err;
        console.table(result);
        employeeTracker();
    });
  }

  function viewEmployees() {
    connection.query (
    
    `SELECT 
      employee.id AS Employee_ID, first_name, last_name, roles.title AS Job_title, 
      roles.salary AS Salary, manager_id, department.name AS Department
      FROM employee
      LEFT JOIN roles on employee.role_id = roles.id
      LEFT JOIN department on roles.department_id = department.id`,
    
      function(err, result) {
      if (err) throw err;
      console.table(result);
      employeeTracker();
    });
  }