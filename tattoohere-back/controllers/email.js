const { Emails, Clients } = require("../models");

const getFeldsReq = (req) => {
  return {
    title:req.body.title,
    message:req.body.message
    // document:req.body.document,
  }
}

exports.sendEmail = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(req.body)

    let formEmail = getFeldsReq();
    
    // Lendo o usuário no banco
    const client = await Documents.findOne({
      where: { id },
    });
    
    if (!!client) {
      formEmail.email = client.email;
      formEmail.nome_fantasia = client.nome_fantasia;
      formEmail.data_envio = new Date();
    } else {
      res.status(404).json({ error: "Cliente não encontrado" });
    }

    // if (!!document) {
    //   res.json(document);
    // } else {
    //   res.status(404).json({ error: "Documento não encontrado" });
    // }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};


exports.sendEmailTest = async (req, res) => {
  res.status(200).json({ok:'ok'});
}

