import { Router } from 'express'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const router = Router()

const upload = multer({ dest: path.join(__dirname, '..', 'uploads') })

const readJSON = (file) =>
  fs.readFile(path.join(__dirname, '..', 'data', file), 'utf-8').then(JSON.parse)

const writeJSON = (file, data) =>
  fs.writeFile(path.join(__dirname, '..', 'data', file), JSON.stringify(data, null, 2), 'utf-8')

router.post('/contact', upload.array('attachments', 5), async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body
    const files = req.files?.map((f) => ({
      originalName: f.originalname,
      filename: f.filename,
      size: f.size,
      mimetype: f.mimetype,
    })) || []

    const entry = {
      id: Date.now(),
      name: name || '',
      email: email || '',
      phone: phone || '',
      subject: subject || '',
      message: message || '',
      files,
      createdAt: new Date().toISOString(),
    }

    const contacts = await readJSON('contacts.json')
    contacts.unshift(entry)
    await writeJSON('contacts.json', contacts)

    res.json({ success: true, id: entry.id })
  } catch {
    res.status(500).json({ error: 'Erreur lors de l\'envoi' })
  }
})

router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body
    if (!email) return res.status(400).json({ error: 'Email requis' })

    const subscribers = await readJSON('newsletter.json')
    if (subscribers.find((s) => s.email === email)) {
      return res.json({ success: true, alreadyExists: true })
    }

    subscribers.unshift({ email, createdAt: new Date().toISOString() })
    await writeJSON('newsletter.json', subscribers)

    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Erreur lors de l\'inscription' })
  }
})

export default router
