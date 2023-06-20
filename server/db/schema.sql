CREATE TABLE client (
    dni INT(25) UNIQUE NOT NULL PRIMARY KEY COMMENT 'Identificación del cliente', 
    full_name VARCHAR(80) NOT NULL,
    email VARCHAR(30) NOT NULL,
    address VARCHAR(20) NOT NULL,
    phone VARCHAR(11) NOT NULL
); 

CREATE TABLE bill(
    N_Bill INT(20) NOT NULL PRIMARY KEY, 
    N_Date DATETIME NOT NULL DEFAULT NOW() UNIQUE, 
)



