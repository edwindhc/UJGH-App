const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

/**
 * Error handler.
 * @public
 */
const handler = (err, req, res, next) => {
  const response = {
    code: err.status || 400,
    message: err.message || httpStatus[err.status] || 400,
    errors: err.errors,
    stack: err.stack,
  };

  res.status(err.status || 400);
  res.json(response);
};
exports.handler = handler;

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
