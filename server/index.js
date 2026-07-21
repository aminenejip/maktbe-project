import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import contentRoutes from './routes/content.js'
import contactRoutes from './routes/contact.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api', contentRoutes)
app.use('/api', contactRoutes)

app.listen(PORT, () => {
  console.log(`API serveur démarré sur http://localhost:${PORT}`)
})
