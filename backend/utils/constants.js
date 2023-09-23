const secretJwtKey = '868a9cf2af1b509be211a2df426e9da5';
const allowedCors = [
  'https://practical.mesto.students.nomoredomainsrocks.ru',
  'http://practical.mesto.students.nomoredomainsrocks.ru',
  'https://localhost:3000',
  'http://localhost:3000',
  'https://api.pract.mesto.students.nomoredomainsrocks.ru',
  'http://api.pract.mesto.students.nomoredomainsrocks.ru',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = { secretJwtKey, allowedCors, DEFAULT_ALLOWED_METHODS };
