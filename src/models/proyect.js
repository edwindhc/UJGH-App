const Sequelize = require('sequelize');
const connection = require('../database/database').connection;
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const User = require('./User')
const crypto = require('crypto');
const moment = require('moment-timezone');
const { omitBy, isNil } = require('lodash');

const Proyect = connection.define('Proyect', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.ENUM('Pending', 'Done'),
    defaultValue: 'Pending'
  },
  qualification: {
    type: Sequelize.INTEGER
  },
  filename: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  filePath: {
    type: Sequelize.STRING
  },
  tutor: {
    type: Sequelize.INTEGER
  },
}, {
  timestamps: true,
});
Proyect.belongsTo(User);
Proyect.prototype.get = async (tok) => {
  try {
    let data = await Proyect.findOne({
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
      message: 'Proyect no existente',
      status: httpStatus.NOT_FOUND,
    });
  } catch (e) {
    throw e;
  }
}


Proyect.prototype.create = async (body) => {
  try {
    const proyect = await Proyect.create(body);
    if (proyect) return proyect;
  } catch (e) {
    throw e;
  }
}

Proyect.prototype.list = async ({ page = 1, perPage = 30, name, UserId, fromDate, toDate }) => {
  try {
    let pagination;
    let options = omitBy({ name, UserId, fromDate, toDate }, isNil);

    if (options.name) options = { ...options, ...{ name: { [Sequelize.Op.like]: `%${name}%` } } };

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
    return Proyect.findAndCountAll(query)
  } catch (e) {
    throw e;
  }
}

Proyect.prototype.delete = async (id) => {
  try {
    const proyect = await Proyect.destroy({ where: { id } });
    if (proyect) return proyect;

    throw new APIError({
      message: 'El proyecto no existente',
      status: httpStatus.NOT_FOUND,
    });
  } catch (e) {
    throw e;
  }
}

module.exports = Proyect;