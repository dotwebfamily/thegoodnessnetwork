const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const Cors = require('cors');
const cors = Cors({
  origin: (origin,callback) =>{
    callback(null,true)
  },
  credentials:true
})

app.use(cors)
app.options('*',cors)

app.get('/', function(req,res) {
  res.send('It is working')
})

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://redsocial:Redsocial1@cluster0-umels.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  poolSize: 10
})

app.use(express.json())

app.use(function(req, res, next) {
  client.connect(function(err, db){
    if (err) res.status(500).send('DB Error!') 
    req.db = db
    next()
  })
})

app.get('/db', function(req, res) {
  res.send('db works')
})

const session = require('express-session')
app.use(session({
  secret: 'secret'
}))


const auth = require('./routes/auth')
const favors = require('./routes/favors')

app.use('/auth', auth.route)
app.use('/favors', auth.middleware)
app.use('/favors', favors)

app.listen(PORT, function(){
  console.log(`Example app listening on PORT ${PORT}!`)
})
