import { Router } from 'express'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { authMiddleware } from './adminAuth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const router = Router()

const readJSON = (file) =>
  fs.readFile(path.join(__dirname, '..', 'data', file), 'utf-8').then(JSON.parse)

const writeJSON = (file, data) =>
  fs.writeFile(path.join(__dirname, '..', 'data', file), JSON.stringify(data, null, 2), 'utf-8')

router.use('/admin', authMiddleware)

function crudRoutes(basePath, dataFile) {
  router.get(`/admin/${basePath}`, async (req, res) => {
    try {
      const data = await readJSON(dataFile)
      res.json(data)
    } catch {
      res.status(500).json({ error: 'Erreur de lecture' })
    }
  })

  router.post(`/admin/${basePath}`, async (req, res) => {
    try {
      const data = await readJSON(dataFile)
      const maxId = data.reduce((max, item) => Math.max(max, item.id || 0), 0)
      const entry = { id: maxId + 1, ...req.body }
      data.push(entry)
      await writeJSON(dataFile, data)
      res.json(entry)
    } catch {
      res.status(500).json({ error: "Erreur lors de l'ajout" })
    }
  })

  router.put(`/admin/${basePath}/:id`, async (req, res) => {
    try {
      const data = await readJSON(dataFile)
      const index = data.findIndex((item) => item.id === Number(req.params.id))
      if (index === -1) return res.status(404).json({ error: 'Introuvable' })
      data[index] = { ...data[index], ...req.body, id: Number(req.params.id) }
      await writeJSON(dataFile, data)
      res.json(data[index])
    } catch {
      res.status(500).json({ error: 'Erreur lors de la modification' })
    }
  })

  router.delete(`/admin/${basePath}/:id`, async (req, res) => {
    try {
      const data = await readJSON(dataFile)
      const index = data.findIndex((item) => item.id === Number(req.params.id))
      if (index === -1) return res.status(404).json({ error: 'Introuvable' })
      data.splice(index, 1)
      await writeJSON(dataFile, data)
      res.json({ success: true })
    } catch {
      res.status(500).json({ error: 'Erreur lors de la suppression' })
    }
  })
}

crudRoutes('coordonnees', 'coordonnees.json')
crudRoutes('news', 'news.json')
crudRoutes('services', 'services.json')

router.get('/admin/content', async (req, res) => {
  try {
    const content = await readJSON('content.json')
    res.json(content)
  } catch {
    res.status(500).json({ error: 'Erreur de lecture' })
  }
})

router.put('/admin/content', async (req, res) => {
  try {
    const content = await readJSON('content.json')
    const updated = { ...content, ...req.body }
    await writeJSON('content.json', updated)
    res.json(updated)
  } catch {
    res.status(500).json({ error: 'Erreur lors de la modification' })
  }
})

export default router
