const md5 = require('md5');
const { createToken } = require('../services/jwtService');
const { validateCreateBody, checkUser, createUser } = require('../services/registerService');
const { validateBody } = require('../services/loginService');

const create = async (req, res) => {
  const { name, password: bodyPassword, email, role } = req.body;
  validateBody({ email, bodyPassword });
  validateCreateBody({ name, role });
  await checkUser(name, email);
  const encryptedPass = md5(bodyPassword);
  const newUser = await createUser({ name, email, password: encryptedPass, role });
  const { password, id, ...info } = newUser;
  const token = await createToken(info);
  return res.status(201).json({ ...info, id, token });
};

module.exports = { create };