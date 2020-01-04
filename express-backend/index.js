const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const Cors = require('cors');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const MongoClient = require('mongodb').MongoClient;
const debug = require('debug')

const cors = Cors({
  origin: (origin,callback) =>{
    callback(null,true)
  },
  credentials:true
})

app.use(cors)

app.get('/', function(req,res) {
  res.send('It is working')
})

const uri = "mongodb+srv://redsocial:Redsocial1@cluster0-umels.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  poolSize: 10,
})


app.use(express.json())

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ client })
}))

let mongoDB;

client.connect(function(err, client){
  const ldebug = debug('app/db')
  if (err){
    ldebug('error connecting')
    return
  } 
  ldebug('connection successfull')
  mongoDB = client
})

app.use(function(req, res, next) {
  const ldebug = debug('app/db-middleware')
  ldebug('db connected')
  req.db = mongoDB 
  next()
})
app.use(function(req, res, next) {
  const ldebug = debug('app/route-logger')
  ldebug(req.url)
  ldebug(req.body)
  req.ldebug = debug('app/route'+req.url)
  next()
})
/*
app.use(function (req, res) {
  const ldebug = debug('app/after-logger')
  ldebug(req.url)
  var send = res.send;
  res.send = function (body) { 
    ldebug(Object.keys(body))
    send.call(this, body);
  };
  next()
});
*/
app.get('/db', function(req, res) {
  res.send('db works')
})

const auth = require('./routes/auth')
const favors = require('./routes/favor')
const users = require('./routes/user')
const organization = require('./routes/organization')

app.use('/auth', auth.route)
app.use('/favor', auth.middleware)
app.use('/favor', favors)
app.use('/user', auth.middleware)
app.use('/user', users)
app.use('/organization', auth.middleware)
app.use('/organization', organization)

app.listen(PORT, function(){
  console.log(`Example app listening on PORT ${PORT}!`)
})
