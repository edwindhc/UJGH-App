const Sequelize = require('sequelize');
const connection = require('../database/database').connection;
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const User = require('./User')
const crypto = require('crypto');
const moment = require('moment-timezone');

const Token = connection.define('Token', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  UserId: {
    type: Sequelize.INTEGER,
  },
  expires: {
    type: Sequelize.DATE,
  },
}, {
  timestamps: true,
});


// Token.belongsTo(User, { source: 'id' });
// Token.associate = function (models) {
//   Token.hasMany(models.Token, { foreingKey: 'UserId', sourceKey: 'id' });
// }

Token.prototype.get = async (id) => {
  try {
    const token = await Token.findByPk(id, {
      raw: true
    });
    if (token) return token;

    throw new APIError({
      message: 'Token no existente',
      status: httpStatus.NOT_FOUND,
    });
  } catch (e) {
    throw e;
  }
}


Token.prototype.create = async (body) => {
  try {
    const token = await Token.create(body);
    if (token) return token;
  } catch (e) {
    throw e;
  }
}

Token.prototype.generate = async (user) => {
  const UserId = user.id;
  const email = user.email;
  const token = `${UserId}.${crypto.randomBytes(40).toString('hex')}`;
  const expires = moment().add(30, 'days').toDate();
  const tokenObject = await Token.create({
    token, UserId, email, expires,
  });
  return tokenObject;
},

  module.exports = Token;