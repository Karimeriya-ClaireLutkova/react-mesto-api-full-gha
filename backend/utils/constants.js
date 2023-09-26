const { JWT_SECRET } = process.env;
const { NODE_ENV } = process.env;

const DEV_KEY = 'dev-secret';

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  DEV_KEY,
};
