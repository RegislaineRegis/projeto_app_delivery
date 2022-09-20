const errorHandlerMiddleware = (error, req, res, _next) => {
  const { status, message } = error;
  if (!status) return res.status(500).json({ message });
  return res.status(status).json({ message });
};

module.exports = errorHandlerMiddleware;