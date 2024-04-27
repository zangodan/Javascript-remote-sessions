CREATE DATABASE sessionsCode;
USE sessionsCode;

CREATE TABLE Sessions(
    sessionID integer PRIMARY KEY NOT NULL,
    code TEXT 
);

INSERT INTO Sessions(sessionID, code)
VALUE
(1, 'console.log("Hello, World!")'),
(2, 'console.log("Hello, World!")'),
(3, 'console.log("Hello, World!")'),
(4, 'console.log("Hello, World!")');