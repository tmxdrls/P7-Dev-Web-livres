const express = require("express")

const mongoose = require('mongoose')

const booksRoutes = require('./routes/book');

const userRoutes = require('./routes/user');

mongoose.connect("",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next()
})

app.use(express.json())

app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);

 module.exports= app;