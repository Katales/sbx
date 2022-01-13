// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const {rootRouter} = require('./routers/root.router'); //todo: do I need it?
const {userRouter} = require('./routers/user.router');
const {authRouter} = require('./routers/auth.router');
const errHandlerMain = require('./errors/error.handler');
const ApiError = require('./errors/ApiError.class');
const {onConnectMdb} = require("./db/db.events");
const {cronTask_actionTknHskp} = require('./cron');

const {NODE_ENV, APP_PORT, ALLOWED_ORIGIN, DB_HOST, DB_PORT, DB_NAME} = process.env;
const MONGO_CONNECT_URL= `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// init
const app = express();

if (NODE_ENV === 'dev') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}
mongoose.connect(MONGO_CONNECT_URL);
mongoose.connection.on('connected', onConnectMdb);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(cors({ origin: _configureCors }));
app.use(rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20 // limit each IP to 1 request within 3 secs
}));
app.use(cors({origin: _configureCors}));

app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use(errHandlerMain);

app.listen(APP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`NodeJS(express) is listening at http://localhost:${APP_PORT}/`);
    cronTask_actionTknHskp.start();
});

function _configureCors(origin, callback) {
    // console.log('++++++++++++++++');
    // console.log('origin', origin);
    // console.log('++++++++++++++++');
    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }
    if (!ALLOWED_ORIGIN.includes(origin)) {
        return callback(new ApiError('CORS is not allowed'), false);
    }
    return callback(null, true);
}
