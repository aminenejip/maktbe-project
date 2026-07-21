import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'ola-admin-secret-change-in-production'

export function generateToken() {
  return jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' })
}

export function verifyToken(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Non autorisé' })
  }
  try {
    jwt.verify(header.split(' ')[1], JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Token invalide' })
  }
}
