  INSERT INTO department
  (`name`)
  VALUES
  ('Owner'),
  ('Staff');

  INSERT INTO `role`
  (title, salary, department_id)
  VALUES
  ('Boss', 100000.00, 1),
  ('Manager',50000.00, 2),
  ('Cook',45000.00, 2),
  ('Waiter',30000.00, 2);
  
INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
  VALUES
  ('Ian', 'Bridges', 1, 2),
  ('Jack', 'Stone', 3, 0),
  ('Hugh', 'Wilson', 2, 0),
  ('Emily', 'Horn', 3, 1),
  ('Will', 'Dingle', 4, 0);
