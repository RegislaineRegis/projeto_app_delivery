const { getAllProducts, addNewSale } = require('../services/customerService');

const getAll = async (req, res) => {
  const data = await getAllProducts();
  return res.status(200).json(data);   
};

const addSale = async (req, res) => {
  // const { products, userId, sellerId, totalPrice, deliveryAddress,
  //    deliveryNumber, saleDate, status } = req.body;
  const data = await addNewSale(req.body);
  return res.status(201).json(data);
};

module.exports = { getAll, addSale };