const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const  cookieParser = require('cookie-parser');
const { requireAtuh } = require('./middleware/authMiddleware')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://dzun:dzun@cluster0.6slf3.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', requireAtuh, (req, res) => res.render('home'));
app.get('/smoothies', requireAtuh, (req, res) => res.render('smoothies'));
app.use(authRoutes);