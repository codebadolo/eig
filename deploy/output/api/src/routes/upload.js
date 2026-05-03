const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const auth = require('../middleware/auth')

const uploadDir = path.join(__dirname, '../uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`
    cb(null, name)
  },
})

const fileFilter = (req, file, cb) => {
  const allowedExt = /jpeg|jpg|png|gif|webp|svg|mp4|webm|ogg|mov/
  const allowedMime = /image\/(jpeg|jpg|png|gif|webp|svg\+xml)|video\/(mp4|webm|ogg|quicktime)/
  const ext = allowedExt.test(path.extname(file.originalname).toLowerCase())
  const mime = allowedMime.test(file.mimetype)
  if (ext && mime) return cb(null, true)
  cb(new Error('Images et vidéos uniquement'))
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 200 * 1024 * 1024 } })

router.post('/', auth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu' })
  const url = `/uploads/${req.file.filename}`
  res.json({ url, filename: req.file.filename })
})

router.delete('/:filename', auth, (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename)
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Fichier non trouvé' })
  fs.unlinkSync(filePath)
  res.json({ message: 'Fichier supprimé' })
})

module.exports = router
