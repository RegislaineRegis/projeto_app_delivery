const models = require('../database/models');
const { throwCustomError } = require('./utils');

const getUser = async (body) => {
  const { email, encryptedPass: password } = body;
  const check = await models.User.findOne({ where: { email, password }, raw: true });
  return check;
};

const validateBody = (body) => {
  const { email, bodyPassword } = body;
  if (!email || !bodyPassword) return throwCustomError(400, 'Invalid fields');
  const regex = /\S+@\S+.\S+/;
  const validateEmail = regex.test(email);
  const validatePassword = bodyPassword.length > 5;
  if (!validateEmail || !validatePassword) return throwCustomError(400, 'Invalid Fields');
};

module.exports = { getUser, validateBody };