const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const prisma = new PrismaClient()

const parseMetier = (m) => ({
  ...m,
  filialesIds: m.filialesIds ? JSON.parse(m.filialesIds) : [],
})

router.get('/', async (req, res) => {
  try {
    const metiers = await prisma.metier.findMany({ orderBy: { ordre: 'asc' } })
    res.json(metiers.map(parseMetier))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:slug', async (req, res) => {
  try {
    const metier = await prisma.metier.findFirst({
      where: { OR: [{ slug: req.params.slug }, { id: req.params.slug }] },
    })
    if (!metier) return res.status(404).json({ error: 'Métier non trouvé' })
    res.json(parseMetier(metier))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const data = { ...req.body, filialesIds: JSON.stringify(req.body.filialesIds || []) }
    const metier = await prisma.metier.create({ data })
    res.status(201).json(parseMetier(metier))
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const data = { ...req.body }
    if (data.filialesIds) data.filialesIds = JSON.stringify(data.filialesIds)
    const metier = await prisma.metier.update({ where: { id: req.params.id }, data })
    res.json(parseMetier(metier))
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.metier.delete({ where: { id: req.params.id } })
    res.json({ message: 'Métier supprimé' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
