const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const { actif } = req.query
    const where = actif !== undefined ? { actif: actif === 'true' } : {}
    const carrieres = await prisma.carriere.findMany({ where, orderBy: { createdAt: 'desc' } })
    res.json(carrieres)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const carriere = await prisma.carriere.findUnique({ where: { id: req.params.id } })
    if (!carriere) return res.status(404).json({ error: 'Offre non trouvée' })
    res.json(carriere)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const carriere = await prisma.carriere.create({ data: req.body })
    res.status(201).json(carriere)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const carriere = await prisma.carriere.update({ where: { id: req.params.id }, data: req.body })
    res.json(carriere)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.carriere.delete({ where: { id: req.params.id } })
    res.json({ message: 'Offre supprimée' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
