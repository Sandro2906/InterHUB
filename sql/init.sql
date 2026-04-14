USE moja_baza;

DROP TABLE IF EXISTS prijave;
DROP TABLE IF EXISTS oglas;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ime VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('osoba', 'firma') NOT NULL,
  phone VARCHAR(30),
  cv_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (ime, email, password, role, phone, cv_url) VALUES
('Lanaco', 'lanaco@gmail.com', '$2b$10$abcdefghijklmnopqrstuv', 'firma', NULL, NULL),
('Prointer', 'prointer@gmail.com', '$2b$10$abcdefghijklmnopqrstuv', 'firma', NULL, NULL),
('Marko Markovic', 'marko@gmail.com', '$2b$10$abcdefghijklmnopqrstuv', 'osoba', '+38765111222', '/cv/marko.pdf'),
('Ana Anic', 'ana@gmail.com', '$2b$10$abcdefghijklmnopqrstuv', 'osoba', '+38766123456', '/cv/ana.pdf'),
('Ivan Ivanic', 'ivan@gmail.com', '$2b$10$abcdefghijklmnopqrstuv', 'osoba', '+38765123457', '/cv/ivan.pdf');

CREATE TABLE oglas (
  OglasID INT PRIMARY KEY AUTO_INCREMENT,
  Pozicija VARCHAR(50),
  Firma VARCHAR(50),
  Lokacija VARCHAR(50),
  Tip VARCHAR(50),
  Iskustvo VARCHAR(50),
  Plata DECIMAL(10,2),
  Datum DATE,
  OpisPosla TEXT,
  user_id INT NOT NULL,
  CONSTRAINT fk_oglas_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO oglas (Pozicija, Firma, Lokacija, Tip, Iskustvo, Plata, Datum, user_id) VALUES
('Frontend Developer Intern', 'Lanaco', 'Banja Luka', 'Internship', 'Junior', 1000.00, '2026-03-28', 1),
('Junior Backend Developer', 'Prointer', 'Banja Luka', 'Full-time', 'Junior', 1600.00, '2026-03-25', 2),
('QA Tester Intern', 'Lanaco', 'Sarajevo', 'Internship', 'Junior', 900.00, '2026-03-22', 1),
('React Developer', 'Lanaco', 'Sarajevo', 'Full-time', 'Junior', 1800.00, '2026-03-20', 1),
('Node.js Developer', 'Prointer', 'Banja Luka', 'Full-time', 'Junior', 1700.00, '2026-03-18', 2);

CREATE TABLE prijave (
  id INT PRIMARY KEY AUTO_INCREMENT,
  oglas_id INT NOT NULL,
  user_id INT NOT NULL,
  datum_prijave TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (oglas_id) REFERENCES oglas(OglasID) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


INSERT INTO prijave (oglas_id, user_id) VALUES
(1, 3),
(1, 4),
(2, 5);