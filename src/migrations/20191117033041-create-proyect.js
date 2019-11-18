'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Proyects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Done')
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
      qualification: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Proyects');
  }
};