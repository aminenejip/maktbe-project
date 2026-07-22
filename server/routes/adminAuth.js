import { Router } from 'express'
import fs from 'fs/promises'
import path from 'path'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'ola-admin-secret'

const readJSON = (file) =>
  fs.readFile(path.join(__dirname, '..', 'data', file), 'utf-8').then(JSON.parse)

const writeJSON = (file, data) =>
  fs.writeFile(path.join(__dirname, '..', 'data', file), JSON.stringify(data, null, 2), 'utf-8')

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requis' })
  }
  try {
    const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET)
    req.admin = decoded
    next()
  } catch {
    return res.status(401).json({ error: 'Token invalide ou expir\u00e9' })
  }
}

router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ error: 'Identifiant et mot de passe requis' })
    }

    const admin = await readJSON('admin.json')
    if (username !== admin.username) {
      return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect' })
    }

    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) {
      return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect' })
    }

    const token = jwt.sign(
      { username: admin.username, email: admin.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({ token, username: admin.username, email: admin.email })
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

router.post('/admin/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Ancien et nouveau mot de passe requis' })
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Le nouveau mot de passe doit contenir au moins 6 caract\u00e8res' })
    }

    const admin = await readJSON('admin.json')
    const valid = await bcrypt.compare(currentPassword, admin.password)
    if (!valid) {
      return res.status(401).json({ error: 'Ancien mot de passe incorrect' })
    }

    admin.password = await bcrypt.hash(newPassword, 10)
    await writeJSON('admin.json', admin)

    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

router.get('/admin/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, username: req.admin.username, email: req.admin.email })
})

export default router