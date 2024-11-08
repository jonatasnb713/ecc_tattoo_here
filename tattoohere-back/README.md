### Rota Autenticação:

* api/auth/signin
* api/auth/signup
* api/auth/signout

### CRUD Usuários:

* api/users (list: GET)
* api/users (add: POST)
* api/users/:id (show: GET)
* api/users/:id (alterar: PUT)
* api/users/:id (delete: DELETE)

### CRUD Clientes:

* api/clients/ (list: GET)
* api/clients/ (add: POST)
* api/clients/:id (show: GET)
* api/clients/:id (alterar: PUT)
* api/clients/:id (delete: DELETE)

### CRUD Documentos:

* api/documents/ (list: GET)
* api/documents/ (add: POST)
* api/documents/:id (show: GET)
* api/documents/:id (alterar: PUT)
* api/documents/:id (delete: DELETE)

* Depois rodar o comando `npm start`, que também foi configurado no package.json.
* Depois acessar a rota `http://localhost:5000/` pelo navegador e ver o `{"ok": true}`.

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

### Comandos Sequelize para criar as tabelas:

* Criar a tabela manualmente.

`npx sequelize-cli init`

* Users:
`npx sequelize-cli model:generate --name Users --attributes nome:string,sobrenome:string,password:string,telefone:string,cpf:string,endereco:string,bairro:string,cidade:string,estado:string,email:string,email_recuperacao:string,token:string`

* Clientes:
`npx sequelize-cli model:generate --name Clients --attributes nome:string,email:string,cpf:string,endereco:string,bairro:string,cidade:string,estado:string,cep:string,telefone:string`

* Documents:
`npx sequelize-cli model:generate --name Documents --attributes nome:string,client_id:integer,estoque_id:integer,data:string,categoria:string,quantidade:integer,preco:float`

* Estoque:
`npx sequelize-cli model:generate --name Estoque --attributes nome:string,tipo:string,quantidade:integer,preco:float`

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

* Comando para gerar: `npx sequelize-cli db:migrate`

### Rodando os scripts iniciais
 * rodar o script `node scripts\cria_dados_iniciais_do_banco.js`