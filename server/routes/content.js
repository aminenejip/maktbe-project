import { Router } from 'express'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const router = Router()

const readJSON = (file) =>
  fs.readFile(path.join(__dirname, '..', 'data', file), 'utf-8').then(JSON.parse)

router.get('/content', async (req, res) => {
  try {
    const [content, services, news, coordonnees] = await Promise.all([
      readJSON('content.json').catch(() => ({})),
      readJSON('services.json').catch(() => []),
      readJSON('news.json').catch(() => []),
      readJSON('coordonnees.json').catch(() => []),
    ])
    res.json({ content, services, news, coordonnees })
  } catch {
    res.status(500).json({ error: 'Erreur de lecture' })
  }
})

router.get('/services', async (req, res) => {
  try {
    const services = await readJSON('services.json')
    res.json(services)
  } catch {
    res.status(500).json({ error: 'Erreur de lecture' })
  }
})

router.get('/news', async (req, res) => {
  try {
    const news = await readJSON('news.json')
    res.json(news)
  } catch {
    res.status(500).json({ error: 'Erreur de lecture' })
  }
})

router.get('/coordonnees', async (req, res) => {
  try {
    const coordonnees = await readJSON('coordonnees.json')
    res.json(coordonnees)
  } catch {
    res.status(500).json({ error: 'Erreur de lecture' })
  }
})

export default router
