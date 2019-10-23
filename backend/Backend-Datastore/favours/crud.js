'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const model = require('./model-datastore');

const router = express.Router();

// Automatically parse request body as form data
router.use(bodyParser.urlencoded({extended: false}));

// Set Content-Type for all responses for these routes
router.use((req, res, next) => {
  res.set('Content-Type', 'text/html');
  next();
});

/**
 * GET /favours
 *
 * Display a page of favours (up to ten at a time).
 */
router.get('/', (req, res, next) => {
  model.list(10, req.query.pageToken, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.render('favours/list.pug', {
      favours: entities,
      nextPageToken: cursor,
    });
  });
});

/**
 * GET /favours/add
 *
 * Display a form for creating a favor.
 */
// [START add_get]
router.get('/add', (req, res) => {
  res.render('favours/form.pug', {
    favor: {},
    action: 'Add',
  });
});
// [END add_get]

/**
 * POST /favours/add
 *
 * Create a favor.
 */
// [START add_post]
router.post('/add', (req, res, next) => {
  const data = req.body;

  // Save the data to the database.
  model.create(data, (err, savedData) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect(`${req.baseUrl}/${savedData.id}`);
  });
});
// [END add_post]

/**
 * GET /favours/:id/edit
 *
 * Display a favor for editing.
 */
router.get('/:favor/edit', (req, res, next) => {
  model.read(req.params.favor, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('favours/form.pug', {
      favor: entity,
      action: 'Edit',
    });
  });
});

/**
 * POST /favours/:id/edit
 *
 * Update a favor.
 */
router.post('/:favor/edit', (req, res, next) => {
  const data = req.body;

  model.update(req.params.favor, data, (err, savedData) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect(`${req.baseUrl}/${savedData.id}`);
  });
});

/**
 * GET /favours/:id
 *
 * Display a favor.
 */
router.get('/:favor', (req, res, next) => {
  model.read(req.params.favor, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('favours/view.pug', {
      favor: entity,
    });
  });
});

/**
 * GET /favours/:id/delete
 *
 * Delete a favor.
 */
router.get('/:favor/delete', (req, res, next) => {
  model.delete(req.params.favor, err => {
    if (err) {
      next(err);
      return;
    }
    res.redirect(req.baseUrl);
  });
});

/**
 * Errors on "/favours/*" routes.
 */
router.use((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = err.message;
  next(err);
});

module.exports = router;
