const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const prisma = new PrismaClient()

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis' })

    const user = await prisma.adminUser.findUnique({ where: { email } })
    if (!user) return res.status(401).json({ error: 'Identifiants incorrects' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ error: 'Identifiants incorrects' })

    const token = jwt.sign(
      { id: user.id, email: user.email, nom: user.nom },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.json({ token, user: { id: user.id, email: user.email, nom: user.nom } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/me', auth, async (req, res) => {
  try {
    const user = await prisma.adminUser.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, nom: true, createdAt: true },
    })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await prisma.adminUser.findUnique({ where: { id: req.user.id } })
    const valid = await bcrypt.compare(currentPassword, user.password)
    if (!valid) return res.status(400).json({ error: 'Mot de passe actuel incorrect' })
    const hashed = await bcrypt.hash(newPassword, 10)
    await prisma.adminUser.update({ where: { id: req.user.id }, data: { password: hashed } })
    res.json({ message: 'Mot de passe mis à jour' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
