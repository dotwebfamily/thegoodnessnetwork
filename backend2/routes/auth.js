const express = require('express')
const router = express.Router()
const User = require('../models').User

// login into an account
router.get('/logout', function(req, res){
  req.session.email = null
  req.session.isAuthenticated = false
  req.session.save()
})
router.post('/login', function(req, res){
  const user = new User(req)
  user.login(
    req.body.email,
    req.body.password
  ).then(function(user) {
    if(user) {
      req.session.email = req.body.email
      req.session.isAuthenticated = true
      res.send('success')
    }
    else {
      res.status(500).send('Login Failed')
    }
  })
})

// create a domain
router.post('/register', function(req, res){
  const user = new User(req)
  // check that domain does not exist
  user.find(req.body.email).then(function(existing) {
    if (!existing){
      user.create(req.body).then(function(result){
        if(result)
          res.send('success')
        else
          res.status(500).send('No se pudo crear usuario')
      })
    } 
    else {
      res.status(500).send('Existing User')
    }
  })
})

const middleware = function(req, res, next) {
  console.log(req.session)
  if (req.session.isAuthenticated)
    next()
  else
    res.status(403).send('Not Authorized!')
}

module.exports.route = router
module.exports.middleware = middleware
