var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var morgan = require('morgan');
var jwt = require('jsonwebtoken')

var config = require('./config')

// Require routes
var employees = require('./routes/employees');
var users = require('./routes/users');
var calendar = require('./routes/calendar')

var cors = require('cors');


//Init App
var app = express();

app.use(cors());

//Set Views
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


//Connect to mongoose
mongoose.connect(config.database);
var db = mongoose.connection;

//set secret
app.set('superSecret', config.secret);

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use('/', users);
app.use('/staffs', employees);
app.use('/calendar', calendar);

app.listen(8000);
console.log('Running on port 8000....');
