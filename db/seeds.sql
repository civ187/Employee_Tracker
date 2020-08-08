USE employee_db;

INSERT INTO department
    (name)
VALUES
    ("Human Resources"),
    ("Operations"),
    ("Finance"),
    ("Marketing"),
    ("Sales"),
    ("Information Technology");

INSERT INTO roles
    (department_id, title, salary)
VALUES
    (1, "HR Manager", 60000),
    (1, "HR Advisor", 25000),
    (2, "Operations Lead", 70000),
    (2, "Operations Analyst", 30000),
    (3, "Internal Auditor", 70000),
    (3, "Accountant", 50000),
    (4, "Events Officer", 40000),
    (4, "Marketing Assistant", 20000),
    (5, "Sales Manager", 80000),
    (5, "Sales Advisor", 40000),
    (6, "Junior Developer", 25000),
    (6, "Network Engineer", 40000);



INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("James", "Hetfield", 1, NULL),
    ("kirk", "Hammett", 2, 1),
    ("Lars", "Ulrich", 2, 1),
    ("Robert", "Trujillo", 2, 1),
    ("Dave", "Mustaine", 3, NULL),
    ("David", "Ellefson", 4, 5),
    ("Chris", "Poland", 4, 5),
    ("Gar", "Samuelson", 4, 5),
    ("Joey", "Belladonna", 5, NULL),
    ("Dan", "Spitz", 6, 9),
    ("Scott", "Ian", 6, 9),
    ("Frank", "Bello", 6, 9),
    ("Charlie", "Benante", 6, 9),
    ("Tom", "Arraya", 7, NULL),
    ("Kerry", "King", 8, 14),
    ("Jeff", "Hanneman", 8, 14),
    ("Dave", "Lombardo", 8, 14),
    ("Dimebag", "Darrell", 9, NULL),
    ("Vinnie", "Paul", 10, 18),
    ("Rex", "Brown", 10, 18),
    ("Phil", "Anselmo", 10, 18),
    ("Zack", "de la Rocha", 12, NULL),
    ("Tom", "Morello", 11, 22),
    ("Tim", "Commerford", 11, 22),
    ("Brad", "Willk", 11, 22);