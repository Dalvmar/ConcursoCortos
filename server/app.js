require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

const { DBURL } = process.env;
const { DBURL_ANG } = process.env;

mongoose.Promise = Promise;
mongoose
  .connect(DBURL)
  .then(() => {
    console.log(`Connected to Mongo on ${DBURL}`)
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
var whitelist = [
  DBURL_ANG
];
var corsOptions = {
  origin: function(origin, callback){
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
  },
  credentials: true
};
app.use(cors(corsOptions));


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.use(session({
  secret: 'angular auth passport secret shh',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 2419200000
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
require('./passport')(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Concurso "En 2 minutos"';


const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);
const userProfile = require('./routes/user');
app.use('/api/profile', userProfile);
const userVideo = require('./routes/video');
app.use('/api/video/', userVideo);
const comments = require('./routes/comments');
 app.use('/api/comments', comments);
 const search = require('./routes/search');
 app.use('/api/search', search);
 const noticia = require('./routes/new');
 app.use('/api/news', noticia);
 const upload = require('./routes/upload');
 app.use('/api/uploads', upload);
 const images = require('./routes/imagenes');
 app.use('/api/images', images);


 app.use(function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
 });


module.exports = app;