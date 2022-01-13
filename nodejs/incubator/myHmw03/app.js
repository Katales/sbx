//DEPENDENCIES
const express = require('express');
const mongoose = require("mongoose");

const {clientRouter} = require('./routers/client.router');
const {userRouter} = require('./routers/user.router');
const {authRouter} = require('./routers/auth.router');
const {MONGO_CONNECT_URL, APP_PORT} = require("./conf/constants");

//init
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
mongoose.connect(MONGO_CONNECT_URL);

app.use('/', clientRouter, userRouter, authRouter);
// app.use('/', rootRouter);
app.use('/clients', clientRouter);
app.use('/users', userRouter);
app.use('/auth/user', authRouter);

app.listen(APP_PORT, () => {console.log('NodeJS(express) is listening at http://localhost:5000/');} );

