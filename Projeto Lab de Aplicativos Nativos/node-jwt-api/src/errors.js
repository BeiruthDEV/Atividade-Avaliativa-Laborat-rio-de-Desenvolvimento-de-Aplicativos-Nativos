// src/errors.js

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function badRequest(message = 'Bad Request') {
  return new HttpError(400, message);
}

function unauthorized(message = 'Unauthorized') {
  return new HttpError(401, message);
}

function forbidden(message = 'Forbidden') {
  return new HttpError(403, message);
}

function notFound(message = 'Not Found') {
  return new HttpError(404, message);
}

function internal(message = 'Internal Server Error') {
  return new HttpError(500, message);
}

module.exports = {
  HttpError,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  internal,
};
