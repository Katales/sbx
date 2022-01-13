// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const {rootRouter} = require('./routers/root.router');
const {userRouter} = require('./routers/user.router');
const {authRouter} = require('./routers/auth.router');
const errHandlerMain = require('./errors/error.handler');
const MONGO_CONNECT_URL= `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// init
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
mongoose.connect(MONGO_CONNECT_URL);

app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use(errHandlerMain);

app.listen(process.env.APP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`NodeJS(express) is listening at http://localhost:${process.env.APP_PORT}/`);
});

