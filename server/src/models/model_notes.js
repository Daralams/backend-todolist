import { DataTypes, Sequelize } from 'sequelize'
import db_connection from '../config/database.js'
import { Users } from './model_users.js'

export const Notes = db_connection.define('notes', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  }
}, { freezeTableName: true })

Notes.belongsTo(Users)
Users.hasMany(Notes)