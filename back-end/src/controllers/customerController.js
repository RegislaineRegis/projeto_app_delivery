const { getAllProducts } = require('../services/customerService');

const getAll = async (req, res) => {
  const data = await getAllProducts();
  return res.status(200).json(data);   
};

module.exports = { getAll };