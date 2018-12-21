let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let server = require('http');
let config = require('./config');

const swaggerUi = require('swagger-ui-express');
let cors = require('cors');
let mongoose = require('mongoose');

let app = express();

let router = require('./routes/router');
let auth = require('./routes/auth');

//Swagger
const swaggerDocument = require('./docs/swagger.json');
//CORS
let corsOptions = {
    origin: ['*'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, letious SmartTVs) choke on 204
    allowedHeaders: ['Content-Type', 'Authorization', 'application/x-www-form-urlencoded'],
    credentials: true
};

// database connection
let options = {
    useNewUrlParser: true
};
mongoose.Promise = global.Promise;
mongoose.connect(config.MongoURI, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('We\'re connected!');
});

app.options('*', cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.post('/signUp',auth.signUp);
app.post('/login',auth.login);
app.use('/api',router);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(err);
});

let port = process.env.port || 8000;
let backend = server.createServer(app).listen(port);

module.exports = app;
