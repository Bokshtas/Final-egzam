USE final;

CREATE TABLE organiser
 (id INT PRIMARY KEY AUTO_INCREMENT, name TEXT, password TEXT);
 
INSERT INTO organiser (name, password) VALUES ('organiser1', '456');
SELECT * FROM organiser;

CREATE TABLE participants
 (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(25), surname VARCHAR(25), email VARCHAR(40), birthday TEXT, organiser_id INT);
 
INSERT INTO participants (name, surname, email, birthday, organiser_id) VALUES ('part1', 'sur1', 'part1@pastas.lt', '2000-02-20', 1);
SELECT * FROM participants;
 
 
 