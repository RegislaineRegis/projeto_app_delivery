const models = require('../database/models');

const getAllProducts = async () => {
  const data = await models.Product.findAll();
  return data;
};

const addNewSale = async (body) => {
  const { products, userId, sellerId, totalPrice, deliveryAddress,
    deliveryNumber, saleDate, status } = body;
  const data = await models.Sale.create({ 
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status });
  products.forEach(async (product) => {
    await models.SalesProduct.create({ 
      saleId: data.id,
      productId: product.id,
      quantity: product.quantity });
  });
  return data;
};

const getAllSellers = async () => {
  const data = await models.User.findAll({ 
    where: { role: 'seller' },
    attributes: { exclude: ['password', 'email', 'role'] } });
  return data;
};

module.exports = { getAllProducts, addNewSale, getAllSellers };