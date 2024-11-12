# Sistema TattooHere

Este repositório contém o código para o sistema TattooHere, composto por um projeto de front-end e um de back-end. Siga as instruções abaixo para configurar e executar o sistema em seu ambiente local.

### Estrutura do Projeto

* tattoohere-front: Projeto de front-end desenvolvido em React (baseado em Vite).
* tattoohere-back:  Projeto de back-end  desenvolvido em Node.js.

### Pré-requisitos

* Node.js: Certifique-se de ter o Node.js instalado. Você pode baixá-lo em nodejs.org.
* MySQL: Necessário para configurar o banco de dados.

### Configuração Inicial

* Clone o repositório e entre em cada uma das pastas principais (tattoohere-front e tattoohere-back), executando o comando `npm install` para instalar as dependências.

* O projeto usa o Sequelize para gerenciar o banco de dados MySQL.

* Entre na pasta tattoohere-back e inicialize o Sequelize usando o comando `npx sequelize-cli init`

* Configure a conexão com o banco de dados em tattoohere-back/config/config.json:
{
  "development": {
    "username": "root",
    "password": null,
    "database": "ecc_tattoo_here",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "ecc_tattoo_here",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

### Execute os comandos abaixo para criar as tabelas iniciais no banco de dados:

* Users:
`npx sequelize-cli model:generate --name Users --attributes nome:string,sobrenome:string,password:string,telefone:string,cpf:string,endereco:string,bairro:string,cidade:string,estado:string,email:string,email_recuperacao:string,token:string`

* Clientes:
`npx sequelize-cli model:generate --name Clients --attributes nome:string,email:string,cpf:string,endereco:string,bairro:string,cidade:string,estado:string,cep:string,telefone:string`

* Documents:
`npx sequelize-cli model:generate --name Documents --attributes nome:string,client_id:integer,estoque_id:integer,data:string,categoria:string,quantidade:integer,preco:float`

* Estoque:
`npx sequelize-cli model:generate --name Estoque --attributes nome:string,tipo:string,quantidade:integer,preco:float`


* Ajuste as associações entre as tabelas, modificando os arquivos em tattoohere-back/models conforme abaixo:

* Models -> Documents:
static associate(models) {
  Documents.belongsTo(models.Clients, { foreignKey: 'client_id', as: 'client' });
  Documents.belongsTo(models.Estoque, { foreignKey: 'estoque_id', as: 'estoque' });
}

* Models -> Clients:
static associate(models) {
  Clients.hasMany(models.Documents, { as: 'documents', foreignKey: 'client_id' });
}

* Modesls -> Estoque:
static associate(models) {
  Estoque.hasMany(models.Documents, { as: 'documents', foreignKey: 'estoque_id' });
}

* Execute a migração para criar as tabelas no banco de dados: `npx sequelize-cli db:migrate`.

### Rodando os scripts iniciais
* Para criar um usuário inicial no banco de dados, execute o seguinte comando na pasta tattoohere-back: `node scripts\cria_dados_iniciais_do_banco.js`.

### Executando o Projeto

* Inicie a API executando o comando `npm start` dentro da pasta tattoohere-back

* A API estará disponível em `http://localhost:5000`. Acesse esta URL no navegador para verificar se a API está funcionando. Deverá aparecer a mensagem: `{"ok": true}`

* Após iniciar a API, entre na pasta tattoohere-front e execute o comando `npm start`.

* O front-end estará disponível em `http://localhost:3000`.