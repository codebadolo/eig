require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const authRoutes = require('./routes/auth')
const filialesRoutes = require('./routes/filiales')
const metiersRoutes = require('./routes/metiers')
const articlesRoutes = require('./routes/articles')
const dirigeantsRoutes = require('./routes/dirigeants')
const companyRoutes = require('./routes/company')
const contactRoutes = require('./routes/contact')
const carrieresRoutes = require('./routes/carrieres')
const uploadRoutes = require('./routes/upload')
const imagesRoutes = require('./routes/images')

const app = express()
const PORT = process.env.PORT || 3001

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  'http://localhost:5173',
  'http://localhost:5174',
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/auth', authRoutes)
app.use('/api/filiales', filialesRoutes)
app.use('/api/metiers', metiersRoutes)
app.use('/api/articles', articlesRoutes)
app.use('/api/dirigeants', dirigeantsRoutes)
app.use('/api/company', companyRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/carrieres', carrieresRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/images', imagesRoutes)

app.get('/api/health', (req, res) => res.json({ status: 'ok', version: '1.0.0' }))

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({ error: err.message || 'Erreur serveur' })
})

app.listen(PORT, () => console.log(`EIG API running on port ${PORT}`))
