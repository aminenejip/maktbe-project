import { Router } from 'express'
import { readJSON, writeJSON } from '../utils/jsonStore.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

function crudRoutes(basePath, dataFile) {
  router.get(`/admin/${basePath}`, authMiddleware, async (req, res) => {
    try {
      const data = await readJSON(dataFile)
      res.json(data)
    } catch {
      res.status(500).json({ error: 'Erreur de lecture' })
    }
  })

  router.post(`/admin/${basePath}`, authMiddleware, async (req, res) => {
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

  router.put(`/admin/${basePath}/:id`, authMiddleware, async (req, res) => {
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

  router.delete(`/admin/${basePath}/:id`, authMiddleware, async (req, res) => {
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

export default router
