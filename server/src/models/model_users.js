import { DataTypes, Sequelize } from 'sequelize'
import db_connection from '../config/database.js' 

export const Users = db_connection.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  confirmPw: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, { freezeTableName: true })