//DEPENDENCIES
const express = require('express');
const {clientRouter} = require('./routers/client.router');

//init
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', clientRouter);
app.use('/clients', clientRouter);

app.listen(5000, () => {console.log('NodeJS(express) is listening at http://localhost:5000/');} );

