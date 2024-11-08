const { Documents, Clients, Estoque } = require("../models");

const getFeldsReq = (req) => {
  const form = JSON.parse(req.body.form)

  let data = {
    nome: form.nome,
    client_id: parseInt(form.client_id),
    estoque_id: parseInt(form.estoque_id),
    data:form.data,
  }  
  return data
}

exports.listAll = async (req, res) => {
  try {
    console.log(req)
    const documents = await Documents.findAll({
      include: [
        { model: Clients, as: 'client' },
        { model: Estoque, as: 'estoque' },
      ],
      order: [["nome", "ASC"]],
    });

    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Documents.findOne({
      where: { id },
    });

    if (!!document) {
      res.json(document);
    } else {
      res.status(404).json({ error: "Documento não encontrado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.create = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {    
    if (req.body.categoria === 'Produto') {
      // TODO: checar se pode vender
      // else throw Error('Nao pode vender produto com falta em estoque')
    }

    const newDocument = await Documents.create(req.body);
    if (newDocument.categoria === 'Produto') {
      // faz movimento
      const estoque = await Estoque.findOne({
        where: { id: newDocument.estoque_id }
      });

      await Estoque.update(
        { quantidade: estoque.quantidade - newDocument.quantidade },
        { where: { id: estoque.id } }
      );
    }

    res.json(newDocument);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;

  try {
    const payload = {};

    const jsonData = getFeldsReq(req)

    Object.keys(jsonData).forEach((key) => {
        const value = jsonData[key];
        if (!!value) {
          payload[key] = value;
         }
    });

    const updatedDocument = await Documents.update(payload, {
      where: { id },
    });

    res.json({ success: !!updatedDocument && +updatedDocument[0] > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.destroy = async (req, res) => {
  const { id } = req.params;  
  try {
    const deletedDocument = await Documents.destroy({
      where: { id },
    });

    res.json({ success: !!deletedDocument });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
