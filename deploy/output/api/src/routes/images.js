const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const { section, actif } = req.query
    const where = {}
    if (section) where.section = section
    if (actif !== undefined) where.actif = actif === 'true'
    const images = await prisma.siteImage.findMany({
      where,
      orderBy: [{ section: 'asc' }, { ordre: 'asc' }],
    })
    res.json(images)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const image = await prisma.siteImage.create({ data: req.body })
    res.status(201).json(image)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const image = await prisma.siteImage.update({
      where: { id: req.params.id },
      data: req.body,
    })
    res.json(image)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.siteImage.delete({ where: { id: req.params.id } })
    res.json({ message: 'Image supprimée' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
