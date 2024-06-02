import express from 'express'
import cors from 'cors'
import authRoute from './routes/route_users.js'
import notesRoute from './routes/route_notes.js'

const app = express()
const PORT = 5000

app.use(express.json())
app.use(authRoute)
app.use(notesRoute)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))