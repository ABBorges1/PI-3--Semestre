// Carrega as variáveis de ambiente (arquivo .env)
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

const assessmentRoute = require('./routes/assessment');
app.use('/assessment', assessmentRoute);

const criterionRoute = require('./routes/criterion');
app.use('/criterion', criterionRoute);

const glossaryRoute = require('./routes/glossary');
app.use=('/glossary', glossaryRoute);

const questionRoute = require('./routes/question');
app.use('/question', questionRoute);

module.exports = app;
