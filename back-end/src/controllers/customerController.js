const { getAllProducts, addNewSale, getAllSellers } = require('../services/customerService');

const getAll = async (req, res) => {
  const data = await getAllProducts();
  return res.status(200).json(data);   
};

const addSale = async (req, res) => {
  const data = await addNewSale(req.body);
  return res.status(201).json(data);
};

const getSeller = async (req, res) => {
  const data = await getAllSellers();
  return res.status(201).json(data);
};

module.exports = { getAll, addSale, getSeller };