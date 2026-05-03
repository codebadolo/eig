const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const { secteur, pays, actif } = req.query
    const where = {}
    if (secteur) where.secteur = secteur
    if (pays) where.pays = pays
    if (actif !== undefined) where.actif = actif === 'true'
    const filiales = await prisma.filiale.findMany({ where, orderBy: { ordre: 'asc' } })
    res.json(filiales)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const filiale = await prisma.filiale.findUnique({ where: { id: req.params.id } })
    if (!filiale) return res.status(404).json({ error: 'Filiale non trouvée' })
    res.json(filiale)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const filiale = await prisma.filiale.create({ data: req.body })
    res.status(201).json(filiale)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const filiale = await prisma.filiale.update({
      where: { id: req.params.id },
      data: req.body,
    })
    res.json(filiale)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.filiale.delete({ where: { id: req.params.id } })
    res.json({ message: 'Filiale supprimée' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
