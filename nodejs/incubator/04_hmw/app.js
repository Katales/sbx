// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');

const {rootRouter} = require('./routers/root.router');
const {userRouter} = require('./routers/user.router');
const {authRouter} = require('./routers/auth.router');
const {MONGO_CONNECT_URL, APP_PORT} = require('./conf/constants');

// init
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
mongoose.connect(MONGO_CONNECT_URL);

app.use('/', rootRouter, userRouter, authRouter);

app.listen(APP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log('NodeJS(express) is listening at http://localhost:5000/');
});

