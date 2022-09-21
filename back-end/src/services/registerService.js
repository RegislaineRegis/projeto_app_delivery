const { Op } = require('sequelize');
const models = require('../database/models');
const { throwCustomError } = require('./utils');

const validateCreateBody = (body) => {
  const { name, role } = body;
  const validateName = name.length > 11;
  if (!name || !role || !validateName) return throwCustomError(400, 'Invalid fields');
};

const checkUser = async (name, email) => {
  const user = await models.User.findOne({ where: { [Op.or]: [{ name }, { email }] } });
  if (user) return throwCustomError(409, 'user already exists');
};

const createUser = async (body) => {
  const newUser = await models.User.create(body);
  return newUser;
};

module.exports = { validateCreateBody, checkUser, createUser };