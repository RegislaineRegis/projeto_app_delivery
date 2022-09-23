const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const throwCustomError = require('./utils');

const secret = await fs.readFile('jwt.evaluation.key', { encoding: "utf-8" });

const createToken = (data) => {
  const token = jwt.sign(data, secret);
  return token;
};

const tokenValidation = (token) => {
  if (!token) throwCustomError(401, 'Token not found');
  try {
    const data = jwt.verify(token, secret);
    return data;
  } catch (error) {
    throwCustomError(401, 'Expired or invalid token');
  }
};

const tokenDecode = (token) => {
  const data = jwt.decode(token);
  return data;
};

module.exports = { createToken, tokenValidation, tokenDecode };