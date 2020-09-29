
# EMPLOYEE TRACKER

AS A business owner  
I WANT to be able to view and manage the departments, roles, and employees in my company  
SO THAT I can organize and plan my business

## Acceptance Criteria
----------------------------------
GIVEN a command-line application that accepts user input

WHEN I start the application  
THEN I am presented with the following options:
- `view all departments`X
- `view all roles`X
- `view all employees`X
- `add a department`X
- `add a role`X
- `add an employee`X
- `update an employee role`X
---
WHEN I choose to `view all departments`  
THEN I am presented with a formatted table showing:  
- department names
- department ids
---
WHEN I choose to `view all roles`
THEN I am presented with the:
- job title
- role id
- department that role belongs to
- salary for that role
---
WHEN I choose to `view all employees`  
THEN I am presented with a formatted table showing employee data including:  
- employee ids 
- first names 
- last names 
- job titles
- departments
- salaries 
- managers that the employees report to
---
WHEN I choose to `add a department`  
THEN I am prompted to enter the name of the department and that department is added to the database  

---

WHEN I choose to `add a role`  
THEN I am prompted to enter the following for the role
- name 
- salary
- department  

The role is added to the database  

---
WHEN I choose to `add an employee`  
THEN I am prompted to enter the employee’s:  
- first name
- last name
- role
- manager  

and that employee is added to the database  

---
WHEN I choose to `update an employee role`  
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

-------
#Bonus  
See if you can add some additional functionality to your application, such as the ability to:  

 - `Update employee managers`.

 - `View employees by manager`.

 - `View employees by department`.XXXX

 - Delete  
   - departments
   - roles
   - employees.

- View the total utilized budget of a department—i.e., the combined salaries of all employees in that department.