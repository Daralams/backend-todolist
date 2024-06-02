import { Sequelize } from 'sequelize'

const db_connection = new Sequelize('fullstack-todolist', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

try {
  await db_connection.authenticate()
  console.log('database connected successfully')
  await db_connection.sync({ force: true })
}catch (error) {
  console.log(error.message)
}

export default db_connection