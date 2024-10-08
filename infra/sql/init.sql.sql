CREATE TABLE Carro (
id_carro SERIAL PRIMARY KEY,
marca VARCHAR (50) NOT NULL,
modelo VARCHAR (50) NOT NULL,
ano INTEGER,
cor VARCHAR (20)
);

SELECT * FROM Carro

CREATE TABLE Cliente (
id_cliente SERIAL PRIMARY KEY,
nome VARCHAR (50) NOT NULL,
cpf VARCHAR (11) UNIQUE NOT NULL,
telefone VARCHAR (16)
);

SELECT * FROM Cliente

CREATE TABLE pedido_venda (
id_pedido SERIAL PRIMARY KEY,
id_carro INTEGER NOT NULL,
id_cliente INTEGER NOT NULL,
data_pedido INTEGER NOT NULL,
valor_pedido DECIMAL (15) NOT NULL,
FOREIGN KEY (id_carro) REFERENCES carro(id_carro),
FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

SELECT * FROM pedido_venda

INSERT INTO Carro (marca, modelo, ano, cor) VALUES
('Mitsubishi', 'Lancer', 2008, 'vermelho'),
('Chevrolet', 'Onix', 2022, 'prata'),
('Ford', 'Focus', 2008, 'prata'),
('Lotus', 'Evora', 2012, 'branco'),
('Ferrari', 'F40', 1987, 'vermelho');

SELECT * FROM Carro

INSERT INTO Cliente (nome, cpf, telefone)VALUES 
('Cláudio', 03361081092,98324-5821),
('Cleber', 59281321076,99435-6932),
('Pedro', 76557261088,993454-9843),
('Pedro', 72387860532,99163-8211),
('Jorge', 46578937421,99114-8900);

SELECT * FROM Cliente

INSERT INTO pedido_venda (id_cliente, id_carro, valor_pedido, data_pedido) VALUES
(1, 1,79722.00, 12/03/24),
(2, 2,67617.00, 10/01/24),
(3, 3,27900.00, 24/07/24),
(4, 4,264979.00, 28/09/24),
(5, 5,3600000.00, 09/06/24);

SELECT * FROM pedido_venda
