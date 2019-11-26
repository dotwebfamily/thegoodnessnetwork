const express = require('express')
const router = express.Router()
const Organization = require('../models').Organization
const User = require('../models').User
const Favor = require('../models').Favor

router.get('/', function(req, res){
  const organization = new Organization(req)
  organization.findAll().then(function(results){
    res.send(results)
  })
})
router.get('/:domain', function(req, res){
  const organization = new Organization(req)
  organization.find(req.params.domain).then(function(results){
    res.send(results)
  })
})
router.get('/:domain/users', function(req, res){
  const user = new User(req)
  user.byDomain(req.params.domain).then(function(results){
    res.send(results)
  })
})
router.get('/:domain/favors', function(req, res){
  const favor = new Favor(req)
  favor.byDomain(req.params.domain).then(function(results){
    res.send(results)
  })
})
router.post('/:domain/favors', function(req, res){
  const favor = new Favor(req)
  favor.fromDomain(req.body.favor,req.session.email).then(function(result){
    if(result)
      res.send('success')
    else
      res.status(500).send('No se pudo crear usuario')
  })
})

module.exports = router
