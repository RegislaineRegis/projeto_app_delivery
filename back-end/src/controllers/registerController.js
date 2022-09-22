const md5 = require('md5');
const { createToken } = require('../services/jwtService');
const { validateCreateBody, checkUser, createUser } = require('../services/registerService');
const { validateBody } = require('../services/loginService');

const create = async (req, res) => {
  const { name, password, email, role } = req.body;
  validateBody({ email, password });
  validateCreateBody({ name, role });
  await checkUser(name, email);
  const encryptedPass = md5(password);
  const newUser = await createUser({ name, email, password: encryptedPass, role });
  const { password_, ...info } = newUser;
  const token = createToken(info);
  return res.status(201).json({ token });
};

module.exports = { create };