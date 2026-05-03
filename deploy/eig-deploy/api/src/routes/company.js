const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const record = await prisma.companyInfo.findUnique({ where: { id: 'main' } })
    if (!record) return res.status(404).json({ error: 'Données non trouvées' })
    res.json(record.data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/', auth, async (req, res) => {
  try {
    const record = await prisma.companyInfo.upsert({
      where: { id: 'main' },
      create: { id: 'main', data: req.body },
      update: { data: req.body },
    })
    res.json(record.data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
