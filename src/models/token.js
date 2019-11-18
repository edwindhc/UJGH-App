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
    type: Sequelize.TEXT
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
Token.belongsTo(User);
Token.prototype.get = async (tok) => {
  try {
    let data = await Token.findOne({
      where: { token: tok },
      raw: true,
      include: [{
        model: User,
        attributes: ['id']
      }]
    },
    );
    if (data) return data;

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
    console.log(body, ' bodybodybodybodybodybody')
    const token = await Token.create(body);
    if (token) return token;
  } catch (e) {
    throw e;
  }
}

Token.prototype.generate = async (user, accessToken) => {
  const UserId = user.id;
  const email = user.email;
  const token = `${UserId}.${crypto.randomBytes(40).toString('hex')}`;
  const expires = moment().add(30, 'days').toDate();
  const tokenObject = await Token.create({
    token: accessToken, UserId, email, expires,
  });
  return tokenObject;
},

  module.exports = Token;