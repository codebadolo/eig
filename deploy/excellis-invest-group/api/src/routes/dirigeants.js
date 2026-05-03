const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const dirigeants = await prisma.dirigeant.findMany({ orderBy: { ordre: 'asc' } })
    res.json(dirigeants)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const dirigeant = await prisma.dirigeant.findUnique({ where: { id: req.params.id } })
    if (!dirigeant) return res.status(404).json({ error: 'Dirigeant non trouvé' })
    res.json(dirigeant)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const dirigeant = await prisma.dirigeant.create({ data: req.body })
    res.status(201).json(dirigeant)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const dirigeant = await prisma.dirigeant.update({ where: { id: req.params.id }, data: req.body })
    res.json(dirigeant)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.dirigeant.delete({ where: { id: req.params.id } })
    res.json({ message: 'Dirigeant supprimé' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
