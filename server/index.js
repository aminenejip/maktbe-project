import express, { Router } from 'express'
import cors from 'cors'
import path from 'path'
import { mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import multer from 'multer'
import contentRoutes from './routes/content.js'
import contactRoutes from './routes/contact.js'
import adminAuthRoutes from './routes/adminAuth.js'
import adminContentRoutes from './routes/adminContent.js'
import { authMiddleware } from './routes/adminAuth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api', contentRoutes)
app.use('/api', contactRoutes)
app.use('/api', adminAuthRoutes)
app.use('/api', adminContentRoutes)

const uploadDir = path.join(__dirname, 'uploads')
mkdirSync(uploadDir, { recursive: true })
const upload = multer({ dest: uploadDir, limits: { fileSize: 5 * 1024 * 1024 } })

const adminRouter = Router()
adminRouter.post('/upload', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Aucun fichier fourni ou format non supporte' })
  res.json({ url: `/uploads/${req.file.filename}` })
})
app.use('/api/admin', adminRouter)

app.listen(PORT, () => {
  console.log(`API serveur démarré sur http://localhost:${PORT}`)
})
