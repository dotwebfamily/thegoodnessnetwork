const express = require('express')
const router = express.Router()
const Favor = require('../models').Favor

router.get('/', function(req, res){
  const favor = new Favor(req)
  favor.findAll().then(function(results){
    res.send(results)
  })
})
router.get('/search/:search', function(req, res){
  const favor = new Favor(req)
  favor.search(req.params.search).then(function(results){
    res.send(results)
  })
})
router.get('/open', function(req, res){
  const favor = new Favor(req)
  favor.findAllOpen().then(function(results){
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
  favor.create(req.body).then(function(results){
    console.log(results)
    if (results === 1)
      res.send('success')
    else if (results === -1)
      res.status(500).send('Not enough coins')
    else
      res.status(500).send('Couldn\'t create')
  })
})

router.get('/accept/:id', function(req, res){
  const favor = new Favor(req)
  console.log(req.params.id)
  favor.accept(req.params.id).then(function(results){
    if (results)
      res.send('success')
    else
      res.status(500).send('No se pudo aceptar favor')
  })
})
router.get('/done/:id', function(req, res){
  const favor = new Favor(req)
  console.log(req.params.id)
  favor.done(req.params.id).then(function(results){
    if (results)
      res.send('success')
    else
      res.status(500).send('No se pudo marcar como hecho el favor')
  })
})
router.get('/notDone/:id', function(req, res){
  const favor = new Favor(req)
  console.log(req.params.id)
  favor.notDone(req.params.id).then(function(results){
    if (results)
      res.send('success')
    else
      res.status(500).send('No se pudo rechazar')
  })
})
router.get('/confirm/:id', function(req, res){
  const favor = new Favor(req)
  console.log(req.params.id)
  favor.completed(req.params.id).then(function(results){
    if (results)
      res.send('success')
    else
      res.status(500).send('No se pudo marcar como completado')
  })
})
router.get('/me/porHacer', function(req, res){
  const favor = new Favor(req)
  favor.findAllDoing().then(function(results){
    res.send(results)
  })
})
router.get('/me/encargados', function(req, res){
  const favor = new Favor(req)
  favor.findAllGiven().then(function(results){
    res.send(results)
  })
})

module.exports = router
