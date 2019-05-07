const errorHandler =  (error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status).json({errorMsg: error.message});
}

module.exports = errorHandler;
