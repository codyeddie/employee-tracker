USE employee_tracker;

INSERT INTO department (department_name)
VALUES 
('Technology'),
('Sales'),
('Maintenance'),
('Customer Service');

INSERT INTO roles (title, salary, department_id)
VALUES
('Developer', 55000, 1),
('Cashier ', 30000, 2),
('Janitor', 20000, 3),
('Forklift', 35000, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES 
('Cody', 'Eddie', 1, 5),
('Tim', 'Royce', 3, 5),
('Willow', 'Bushman', 4, 5),
('Ziggy', 'Hubbell', 2, 5),
('Oatmeal', 'Sweetheart', 1, 5)