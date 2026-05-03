const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const { categorie, publie, featured } = req.query
    const where = {}
    if (categorie) where.categorie = categorie
    if (publie !== undefined) where.publie = publie === 'true'
    if (featured !== undefined) where.featured = featured === 'true'
    const articles = await prisma.article.findMany({ where, orderBy: { createdAt: 'desc' } })
    res.json(articles)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:slug', async (req, res) => {
  try {
    const article = await prisma.article.findFirst({
      where: { OR: [{ slug: req.params.slug }, { id: req.params.slug }] },
    })
    if (!article) return res.status(404).json({ error: 'Article non trouvé' })
    res.json(article)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const article = await prisma.article.create({ data: req.body })
    res.status(201).json(article)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const article = await prisma.article.update({ where: { id: req.params.id }, data: req.body })
    res.json(article)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.article.delete({ where: { id: req.params.id } })
    res.json({ message: 'Article supprimé' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
