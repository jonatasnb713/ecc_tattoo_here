# Sistema TattooHere

Este repositório tem como objetivo colocar os códigos utilizados para fazer o front e o back do sistema TattooHere, assim como as instruções detalhadas para utiliza-lo.

Existem dois projetos distintos dentro deste repositório. O projeto *tattoohere-front* que é o front-end do projeto feito em React (baseado em Vite)

E o projeto *tattoohere-back* que é o back-end feita em Node.js.

Após baixar este repositório, para testar este projeto você deverá entrar em cada uma das pastas primárias e dar o comando `npm install`.

A API que deve ser estabelecida primeiro depende de um banco de dados MySQL para funcionar. 

O primeiro passo será inicializar o Sequelize usando o comando `npx sequelize-cli init`

Feito isso, basta acertar a conexão com o banco em `tattoohere-back/config/config.json` e configurar da seguinte forma:
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

E então, para montar as tabelas, use os seguinte comandos no Terminal:

* Users:
`npx sequelize-cli model:generate --name Users --attributes nome:string,sobrenome:string,password:string,telefone:string,cpf:string,endereco:string,bairro:string,cidade:string,estado:string,email:string,email_recuperacao:string,token:string`

* Clientes:
`npx sequelize-cli model:generate --name Clients --attributes nome:string,email:string,cpf:string,endereco:string,bairro:string,cidade:string,estado:string,cep:string,telefone:string`

* Documents:
`npx sequelize-cli model:generate --name Documents --attributes nome:string,client_id:integer,estoque_id:integer,data:string,categoria:string,quantidade:integer,preco:float`

* Estoque:
`npx sequelize-cli model:generate --name Estoque --attributes nome:string,tipo:string,quantidade:integer,preco:float`

Você ainda irá precisar ajustar as relações entre algumas tabelas na pasta `Models` e deixar da seguinte forma:

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

depois rodar o comando `npx sequelize-cli db:migrate` para criar as tabelas em seu banco de dados.

### Rodando os scripts iniciais
* Para criar o usuário inicial no banco, execute o seguinte script no terminal:
`node scripts\cria_dados_iniciais_do_banco.js`

Nas sequencia será possível ligar a API em seu ambiente com o comando `npm start`.
* Depois de rodar o comando `npm start`, a API irá rodar inicialmente em `http://localhost:5000`, você pode acessar essa rota no navegador e se tudo ocorreu conforme esperado
irá aparecer no navegador `{"ok": true}`.

Depois da API ligada, podemos ligar o front-end e testar a integração, com o comando `npm start` dentro da pasta *tattoohere-front*. 

Nosso projeto estará rodando em http://localhost:3000.