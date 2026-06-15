-- Inserindo Categorias
INSERT INTO tb_categoria (nome) VALUES ('Pratos Principais');
INSERT INTO tb_categoria (nome) VALUES ('Bebidas');
INSERT INTO tb_categoria (nome) VALUES ('Sobremesas');

-- Inserindo Pratos
INSERT INTO tb_prato (nome, descricao, preco, categoria_id) VALUES ('Arroz Carreteiro', 'Arroz com carne seca e temperos arretados', 35.0, 1);
INSERT INTO tb_prato (nome, descricao, preco, categoria_id) VALUES ('Feijoada', 'Feijoada completa com couve e farofa', 45.0, 1);

-- Inserindo Bebidas
INSERT INTO tb_bebida (nome, volume, preco, categoria_id) VALUES ('Suco de Caju', '500ml', 8.0, 2);
INSERT INTO tb_bebida (nome, volume, preco, categoria_id) VALUES ('Cerveja Artesanal', '600ml', 15.0, 2);
