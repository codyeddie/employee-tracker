DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
 id INT AUTO_INCREMENT PRIMARY KEY,
 department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
 id INTEGER AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(30) NOT NULL,
 salary DECIMAL NOT NULL,
 department_id INTEGER NOT NULL,
 CONSTRAINT fk_department
       FOREIGN KEY (department_id)
       REFERENCES department (id)
       ON DELETE CASCADE
);

CREATE TABLE employee (
 id INTEGER AUTO_INCREMENT PRIMARY KEY,
 first_name VARCHAR(30) NOT NULL,
 last_name VARCHAR(30) NOT NULL,
 roles_id INTEGER,
 manager_id INTEGER,
 CONSTRAINT fk_roles
       FOREIGN KEY (roles_id)
       REFERENCES roles (id)
       ON DELETE SET NULL,
       CONSTRAINT fk_manager
       FOREIGN KEY (manager_id)
       REFERENCES employee (id)
       ON DELETE SET NULL,
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);