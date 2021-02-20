require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');




const indexRouter = require('./routes/index');

const app = express()

const isDev = process.env.NODE_ENV === 'development';

// view engine setup - also include the handlebars helper file
app.set('views', path.join(__dirname, 'views'));
//when configuring the app view engine
app.engine('.hbs', exphbs({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'views'),
  helpers: require('./utilities/handlebars-helpers') //only need this
}));
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({  extended: true }))
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(lessMiddleware(path.join(__dirname, 'public')));

if(isDev) app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


// START SERVER
let server = {};
const port = process.env.PORT || 8081;
if(isDev){
  
  https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(port, function () {
    logger.info('App listening on port '+port+' Go to https://localhost:8081/')
  })
}else{
  server = http.createServer(app).listen(port)
  logger.info('server now listening')
}


//404 route - this must ALWAYS be the last *real* route before the one with the err param below.)
app.use('*', function(req, res, next){
  res.format({
    html: function() {
      res.status(404).render('404', {layout: 'loginLayout'});
    },
    json: function(){
      res.status(404).json({error: 'not found'});
    }
  })
})

//Error handling route - should always stay all the way at the end. 
app.use(function(err, req, res, next) {
  logger.info("==== Application Error ====")
  logger.info(new Date());
  console.error(err); // Log error message in our server's console
  var stack = new Error().stack
  logger.info( stack )
  let data = {};
  if(req.user){
    data.user = req.user;
  }
  if(req.originalUrl){
    data.url = req.originalUrl;
  }
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send("Bad Request"); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
