const { encryptSHA256 } = require("../auth");
const { Users } = require("../models");

Users.create({
  nome: "Jonatas",
  sobrenome: "Fernandes Grassi",
  email: "jonatasfernandesgrassi@gmail.com",
  email_recuperacao: "jonatasfernandesgrassi@gmail.com",
  estado: "SC",
  telefone: "48999999999",
  cpf: "99999999999",
  password: encryptSHA256("123456"),
  type: "admin",
});
