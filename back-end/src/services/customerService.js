const models = require('../database/models');

const getAllProducts = async () => {
  const data = await models.Product.findAll();
  return data;
};

const addNewSale = async (body) => {
  const { products, userId, sellerId, totalPrice, deliveryAddress,
    deliveryNumber } = body;
  const { dataValues } = await models.Sale.create({ 
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: 'Pendente' });
  await Promise.all(products.map((product) => {
   const saleProduct = models.SalesProduct.create({ 
      saleId: dataValues.id,
      productId: product.id,
      quantity: product.quantity });
      return saleProduct;
  }));
  return dataValues;
};

const getAllSellers = async () => {
  const data = await models.User.findAll({ 
    where: { role: 'seller' },
    attributes: { exclude: ['password', 'email', 'role'] } });
  return data;
};

module.exports = { getAllProducts, addNewSale, getAllSellers };