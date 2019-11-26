const express = require('express')
const router = express.Router()
const User = require('../models').User
const Organization = require('../models').Organization

// login into an account
router.get('/logout', function(req, res){
  req.session.destroy()
  res.send('success')
})
router.post('/login', function(req, res){
  const user = new User(req)
  req.ldebug(user)
  user.login(
    req.body.email,
    req.body.password
  ).then(function(user) {
    req.ldebug('then',user)
    if(user) {
      req.session.email = req.body.email
      req.session.isAuthenticated = true
      req.session.admin = user.admin
      const domain = req.body.email.match(/^.+@(.+\..+)$/)[1]
      req.session.organization = domain
      res.send({ 
        message:'success',
        user: {
          email: user.email,
          admin: user.admin,
          organization: domain
        }
      })
    }
    else {
      res.status(500).send('Login Failed')
    }
  }).catch(
    (error)=>{
      res.status(500).send('Login Failed')
      req.ldebug(error)
    }
  )
})

// register user if registered domain
router.post('/register', function(req, res){
  const user = new User(req)
  const organization = new Organization(req)
  // check that domain does not exist
  const domain = req.body.email.match(/^.+@(.+\..+)$/)[1]
  console.log({domain})
  organization.find(domain).then(function(organization){
    if (organization)
      return user.find(req.body.email).then(function(existing) {
        if (!existing){
          user.create(req.body).then(function(result){
            if(result)
              res.send({message:'success',confirm:false})
            else
              res.status(500).send('No se pudo crear usuario')
          })
        } 
        else {
          res.status(500).send('Existing User')
        }
      })
    else {
      res.send({
        message:'Organization not yet registered',
        confirm:true
      }) 
    }
  })
})

router.post('/register/organization', function(req, res){
  const user = new User(req)
  const organization = new Organization(req)
  const domain = req.body.admin.email.match(/^.+@(.+\..+)$/)[1]
  console.log({domain})
  Promise.all([
    user.create({admin:true,...req.body.admin}),
    organization.create({
      domain,
      name:req.body.organization
    })
  ]).then(([userConfirm,domainConfirm])=>{
    if (userConfirm && domainConfirm){ 
      res.send('success')
    }
    else {
      res.status(500).send('Creation failed')
    }
  })
})

const middleware = function(req, res, next) {
  console.log("session",req.session)
  if (req.session.isAuthenticated)
    next()
  else
    res.status(403).send('Not Authorized!')
}

module.exports.route = router
module.exports.middleware = middleware
