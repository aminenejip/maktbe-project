import { Router } from 'express'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { verifyToken } from '../middleware/auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const router = Router()

const readJSON = (file) =>
  fs.readFile(path.join(__dirname, '..', 'data', file), 'utf-8').then(JSON.parse)

const writeJSON = (file, data) =>
  fs.writeFile(path.join(__dirname, '..', 'data', file), JSON.stringify(data, null, 2), 'utf-8')

router.get('/content', async (req, res) => {
  try {
    const [content, books, bundles] = await Promise.all([
      readJSON('content.json'),
      readJSON('books.json'),
      readJSON('bundles.json'),
    ])
    res.json({ content, books, bundles })
  } catch {
    res.status(500).json({ error: 'Erreur de lecture' })
  }
})

router.put('/content', verifyToken, async (req, res) => {
  try {
    await writeJSON('content.json', req.body.content)
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Erreur d\'écriture' })
  }
})

router.put('/books', verifyToken, async (req, res) => {
  try {
    await writeJSON('books.json', req.body.books)
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Erreur d\'écriture' })
  }
})

router.put('/bundles', verifyToken, async (req, res) => {
  try {
    await writeJSON('bundles.json', req.body.bundles)
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Erreur d\'écriture' })
  }
})

router.get('/contacts', verifyToken, async (req, res) => {
  try {
    const contacts = await readJSON('contacts.json')
    res.json(contacts)
  } catch {
    res.status(500).json({ error: 'Erreur de lecture' })
  }
})

router.get('/newsletter', verifyToken, async (req, res) => {
  try {
    const subscribers = await readJSON('newsletter.json')
    res.json(subscribers)
  } catch {
    res.status(500).json({ error: 'Erreur de lecture' })
  }
})

router.get('/settings', verifyToken, async (req, res) => {
  try {
    const settings = await readJSON('settings.json')
    res.json(settings)
  } catch {
    res.status(500).json({ error: 'Erreur de lecture' })
  }
})

router.put('/settings', verifyToken, async (req, res) => {
  try {
    await writeJSON('settings.json', req.body)
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Erreur d\'écriture' })
  }
})

export default router
