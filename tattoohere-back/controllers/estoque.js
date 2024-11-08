const { Estoque } = require("../models");

const getFeldsReq = (req) => {
  return {
    nome:req.body.nome,
    tipo:req.body.tipo,
    quantidade:req.body.quantidade,
    preco:req.body.preco,
  }
}

exports.listAll = async (req, res) => {
  try {
    const estoque = await Estoque.findAll({
      order: [["nome", "ASC"]],
    });

    res.json(estoque);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const estoque = await Estoque.findOne({
      where: { id },
    });

    if (!!estoque) {
      res.json(estoque);
    } else {
      res.status(404).json({ error: "Produto não encontrado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.create = async (req, res) => {
  try {
    const newEstoque = await Estoque.create(
      getFeldsReq(req)
    );

    res.json(newEstoque);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// @pending fazer as proteções dos campos
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

    const updatedEstoque = await Estoque.update(payload, {
      where: { id },
    });

    res.json({ success: !!updatedEstoque && +updatedEstoque[0] > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEstoque = await Estoque.destroy({
      where: { id },
    });

    res.json({ success: !!deletedEstoque });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};