DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(30) NOT NULL,
    PRIMARY KEY (id));

CREATE TABLE roles (
    id int(11) NOT NULL AUTO_INCREMENT,
    title varchar(30) NOT NULL,
    salary decimal(10,0) NOT NULL,
    department_id int(11) NOT NULL,
    PRIMARY KEY (id),
    KEY role_FK (department_id),
    CONSTRAINT role_FK FOREIGN KEY (department_id) REFERENCES department (id));

CREATE TABLE employee (
    id int(11) NOT NULL AUTO_INCREMENT,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id int(11) NOT NULL,
    manager_id int(11) DEFAULT NULL,
    PRIMARY KEY (id),
    KEY employee_role_FK (role_id),
    KEY employee_manager_FK (manager_id),
    CONSTRAINT employee_role_FK FOREIGN KEY (role_id) REFERENCES roles (id),
    CONSTRAINT employee_manager_FK FOREIGN KEY (manager_id) REFERENCES employee (id));


