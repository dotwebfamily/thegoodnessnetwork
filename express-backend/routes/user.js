const express = require('express')
const router = express.Router()
const User = require('../models').User

router.get('/', function(req, res){
  const user = new User(req)
  user.findAll().then(function(results){
    res.send(results)
  })
})

module.exports = router
