'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const model = require('./model-datastore');

const router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());

/**
 * GET /api/favours
 *
 * Retrieve a page of favours (up to ten at a time).
 */
router.get('/', (req, res, next) => {
  model.list(10, req.query.pageToken, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.json({
      items: entities,
      nextPageToken: cursor,
    });
  });
});

/**
 * POST /api/favours
 *
 * Create a new favour.
 */
router.post('/', (req, res, next) => {
  model.create(req.body, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.json(entity);
  });
});

/**
 * GET /api/favor/:id
 *
 * Retrieve a favor.
 */
router.get('/:favor', (req, res, next) => {
  model.read(req.params.favor, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.json(entity);
  });
});

/**
 * PUT /api/favours/:id
 *
 * Update a favor.
 */
router.put('/:favor', (req, res, next) => {
  model.update(req.params.favor, req.body, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.json(entity);
  });
});

/**
 * DELETE /api/favours/:id
 *
 * Delete a favor.
 */
router.delete('/:favor', (req, res, next) => {
  model.delete(req.params.favor, err => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send('OK');
  });
});

/**
 * Errors on "/api/favours/*" routes.
 */
router.use((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = {
    message: err.message,
    internalCode: err.code,
  };
  next(err);
});

module.exports = router;
