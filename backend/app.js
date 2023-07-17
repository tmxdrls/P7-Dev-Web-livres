const express = require('express')

const helmet = require('helmet');

const mongoose = require('mongoose')

const path = require('path');

const booksRoutes = require('./routes/book');

const userRoutes = require('./routes/user');

const rateLimit = require ('express-rate-limit')

require('dotenv').config();

const mongoUrl = process.env.DB_URL

mongoose.connect(mongoUrl,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !', error))

const app = express()

app.use(helmet())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('Cross-Origin-Resource-Policy','same-site')
  next()
})

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100, 
	standardHeaders: true, 
	legacyHeaders: false, 
})

app.use(limiter)

app.use(express.json())

app.use('/images', express.static(path.join(__dirname, 'images-min')));
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);

 module.exports= app;


