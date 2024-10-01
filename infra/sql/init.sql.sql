CREATE TABLE Carro (
id_carro SERIAL PRIMARY KEY,
marca VARCHAR (50) NOT NULL,
modelo VARCHAR (50) NOT NULL,
ano INTEGER,
cor VARCHAR (20)
);

CREATE TABLE Cliente (
id_cliente SERIAL PRIMARY KEY,
nome VARCHAR (50) NOT NULL,
cpf VARCHAR (11) UNIQUE NOT NULL,
telefone VARCHAR (16)
);

CREATE TABLE pedido_venda (
id_pedido_venda SERIAL PRIMARY KEY,
id_carro INTEGER NOT NULL,
id_cliente INTEGER NOT NULL,
valor_pedido DECIMAL (6) NOT NULL,
FOREIGN KEY (id_carro) REFERENCES carro(id_carro),
FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

SELECT * FROM Carro

INSERT INTO Carro (marca, modelo, ano, cor) VALUES ('Mitsubishi', 'Lancer','2008','vermelho');
INSERT INTO Carro (marca, modelo, ano, cor) VALUES ('Chevrolet', 'Onix','2022','prata');
INSERT INTO Carro (marca, modelo, ano, cor) VALUES ('Ford', 'Focus','2008','prata');
INSERT INTO Carro (marca, modelo, ano, cor) VALUES ('Lotus', 'Evora','2012','branco');
INSERT INTO Carro (marca, modelo, ano, cor) VALUES ('Ferrari', 'F40','1987','vermelho');


SELECT * FROM Cliente

INSERT INTO Cliente (nome, cpf, telefone)VALUES ('Cláudio', '03361081092','98324-5821');
INSERT INTO Cliente (nome, cpf, telefone)VALUES ('Cleber', '59281321076','99435-6932');
INSERT INTO Cliente (nome, cpf, telefone)VALUES ('Pedro', '76557261088','993454-9843');
INSERT INTO Cliente (nome, cpf, telefone)VALUES ('Pedro', '72387860532','99163-8211');
INSERT INTO Cliente (nome, cpf, telefone)VALUES ('Jorge', '46578937421','99114-8900'),

SELECT * FROM pedido_venda

INSERT INTO pedido_venda (id_cliente, id_carro, valor_pedido) VALUES
(1, 1,20.000),
(2, 2,300.00),
(3, 3,300.500),
(6, 4,200.000),
(7, 5,444.500);

