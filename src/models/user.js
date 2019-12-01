const Sequelize = require('sequelize');
const connection = require('../database/database').connection;
const { omitBy, isNil } = require('lodash');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const Token = require('./Token')

const User = connection.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  dni: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  career: {
    type: Sequelize.STRING
  },
  tutor: {
    type: Sequelize.INTEGER
  },
  phone: {
    type: Sequelize.STRING
  },
}, {
  timestamps: true,
});

// User.hasMany(Token);

User.prototype.get = async (id) => {
  try {
    const user = await User.findByPk(id, {
      raw: true
    });
    if (user) return user;

    throw new APIError({
      message: 'El usuario no existente',
      status: httpStatus.NOT_FOUND,
    });
  } catch (e) {
    throw e;
  }
}

User.prototype.getToken = async (id) => {
  try {
    let data = await Token.findOne({
      where: { token: id }
    }, {
      include: [{
        model: User,
        attributes: ['name']
      }]
    }
    );

    console.log(data.dataValues)
    if (data.dataValues) return data.dataValues;

    throw new APIError({
      message: 'Token no existente',
      status: httpStatus.NOT_FOUND,
    });
  } catch (e) {
    throw e;
  }
}


User.prototype.findAndGenerateToken = async (options) => {
  try {
    const { id, email, password } = options;
    if (!email) throw new APIError({ message: 'An email is required to generate a token' });
    let user = await User.findOne({
      where: {
        email
      }
    }, { raw: true });
    user = user.dataValues;
    if (password) {
      if (user && await bcrypt.compare(password, user.password)) {
        return { user, accessToken: await User.prototype.token(user.id) };
      }
    }
  } catch (e) {
    throw e;
  }
}

User.prototype.token = async (id) => {
  try {
    const playload = {
      exp: moment().add(999, 'minutes').unix(),
      iat: moment().unix(),
      sub: id,
    };
    return jwt.encode(playload, 'bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4');
  } catch (e) {
    throw e;
  }
}
User.prototype.list = async ({ page = 1, perPage = 30, title, role, tutor, CategoryId, fromDate, toDate }) => {
  try {
    let pagination;
    let options = omitBy({ role, title, tutor, CategoryId, fromDate, toDate }, isNil);

    if (options.title) options = { ...options, ...{ title: { [Sequelize.Op.like]: `%${title}%` } } };

    else if (fromDate && toDate) options = { ...options, ...{ createdAt: { [Sequelize.Op.gte]: fromDate, [Sequelize.Op.lte]: toDate } } };

    if (fromDate && !toDate) options = { ...options, ...{ createdAt: { [Sequelize.Op.gte]: fromDate } } }

    if (!fromDate && toDate) options = { ...options, ...{ createdAt: { [Sequelize.Op.lte]: toDate } } }

    if (perPage > 0) pagination = { offset: perPage * (page - 1), limit: perPage };

    const query = {
      raw: true,
      order: [
        ['createdAt', 'DESC'],
      ],
      where: options,
      ...pagination
    }
    return User.findAndCountAll(query)
  } catch (e) {
    throw e;
  }
}

User.prototype.create = async (body) => {
  try {
    let data = body;
    const { email } = data
    if (!data.email) throw new APIError({ message: 'An email is required' });
    let findUser = await User.findOne({
      where: {
        email
      }
    }, { raw: true });
    if (findUser && findUser.dataValues) throw new APIError({ message: 'Email duplicado' });
    data.password = await bcrypt.hash(body.password, 10);
    const user = await User.create(data);
    if (user) return user;
  } catch (e) {
    throw e;
  }
}

User.prototype.update = async (producto) => {
  try {
    const id = producto.id;
    const productUpdate = await User.update(producto, { where: { id } });
    if (productUpdate) return productUpdate;

    throw new APIError({
      message: 'Usuario no existente',
      status: httpStatus.NOT_FOUND,
    });
  } catch (e) {
    throw e;
  }
}

User.prototype.delete = async (id) => {
  try {
    const user = await User.destroy({ where: { id } });
    if (user) return user;

    throw new APIError({
      message: 'Usuario no existente',
      status: httpStatus.NOT_FOUND,
    });
  } catch (e) {
    throw e;
  }
}

User.prototype.checkDuplicateEmail = async (error) => {
  console.log(error, ' este es el error')
  if (error.name === 'MongoError' && error.code === 11000) {
    return new APIError({
      message: 'Validation Error',
      errors: [{
        field: 'email',
        location: 'body',
        messages: ['"email" already exists'],
      }],
      status: httpStatus.CONFLICT,
      isPublic: true,
      stack: error.stack,
    });
  }
  return error;
},

  module.exports = User;