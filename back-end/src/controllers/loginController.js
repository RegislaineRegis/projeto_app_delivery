const md5 = require('md5');
const { createToken } = require('../services/jwtService');
const { validateBody, getUser } = require('../services/loginService');
const { throwCustomError } = require('../services/utils');

const login = async (req, res) => {
  validateBody(req.body);
  const { password: bodyPassword, email } = req.body;
  const encryptedPass = md5(bodyPassword);
  const user = await getUser({ email, encryptedPass });
  if (!user) throwCustomError(404, 'Not found');
  const { id, password, ...info } = user;
  const token = createToken(info);
  return res.status(200).json({ ...info, token });
};

module.exports = { login };