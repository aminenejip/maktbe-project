import { Router } from 'express'
import bcrypt from 'bcryptjs'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { generateToken } from '../middleware/auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const router = Router()
const ADMIN_FILE = path.join(__dirname, '..', 'data', 'admin.json')

async function getAdmin() {
  try {
    const raw = await fs.readFile(ADMIN_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    const defaultAdmin = {
      username: 'admin',
      password: bcrypt.hashSync('admin123', 10),
    }
    await fs.writeFile(ADMIN_FILE, JSON.stringify(defaultAdmin, null, 2))
    return defaultAdmin
  }
}

router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const admin = await getAdmin()

    if (username !== admin.username || !bcrypt.compareSync(password, admin.password)) {
      return res.status(401).json({ error: 'Identifiants incorrects' })
    }

    const token = generateToken()
    res.json({ token })
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
