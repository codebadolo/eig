const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const prisma = new PrismaClient()

router.post('/', async (req, res) => {
  try {
    const { nom, email, telephone, sujet, message } = req.body
    if (!nom || !email || !sujet || !message) {
      return res.status(400).json({ error: 'Champs requis manquants' })
    }
    const msg = await prisma.contactMessage.create({ data: { nom, email, telephone, sujet, message } })
    res.status(201).json({ message: 'Message envoyé', id: msg.id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const { lu } = req.query
    const where = lu !== undefined ? { lu: lu === 'true' } : {}
    const messages = await prisma.contactMessage.findMany({ where, orderBy: { createdAt: 'desc' } })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/:id/lu', auth, async (req, res) => {
  try {
    const msg = await prisma.contactMessage.update({ where: { id: req.params.id }, data: { lu: true } })
    res.json(msg)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.contactMessage.delete({ where: { id: req.params.id } })
    res.json({ message: 'Message supprimé' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
