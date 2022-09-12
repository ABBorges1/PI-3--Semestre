require ('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

//conexão ao banco de dados remoto
const connectDb = require('./config/database')
connectDb();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

/* Rotas da aplicação */
const userRoute = require('./routes/user');
app.use('/user', userRoute);

module.exports = app;
