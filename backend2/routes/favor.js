const express = require('express')
const router = express.Router()
const Favor = require('../models').Favor

router.get('/', function(req, res){
  const favor = new Favor(req)
  favor.findAll().then(function(results){
    res.send(results)
  })
})

router.get('/:id', function(req, res){
  const favor = new Favor(req)
  favor.find(req.params.id).then(function(results){
    res.send(results)
  })
})

router.post('/', function(req, res){
  const favor = new Favor(req)
  req.body.creator = req.session.email
  favor.create(req.body).then(function(results){
    if (results)
      res.send('success')
    else
      res.status(500).send('No se pudo crear favor')
  })
})

module.exports = router
