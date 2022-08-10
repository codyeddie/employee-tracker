USE employee_db;

INSERT INTO department (name)
VALUES 
('Information Technology'),
('Sales'),
('Maintenance'),
('Customer Service');

INSERT INTO roles (title, salary, department_id)
VALUES
('Web Developer', 55000, 1),
('Sales Representative ', 30000, 2),
('Janitor', 20000, 3),
('Lift Truck Operator', 35000, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES 
('Cody', 'Eddie', 1, 5),
('Tim', 'Royce', 3, 5),
('Willow', 'Bushman', 4, 5),
('Ziggy', 'Hubbell', 2, 5),
('Oatmeal', 'Sweetheart', 1, 5)