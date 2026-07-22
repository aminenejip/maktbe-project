import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'ola-admin-secret'

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
