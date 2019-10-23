'use strict';

const {Datastore} = require('@google-cloud/datastore');

// [START config]
const ds = new Datastore();
const kind = 'favor';
// [END config]


function fromDatastore(obj) {
  obj.id = obj[Datastore.KEY].id;
  return obj;
}


function toDatastore(obj, nonIndexed) {
  nonIndexed = nonIndexed || [];
  const results = [];
  Object.keys(obj).forEach(k => {
    if (obj[k] === undefined) {
      return;
    }
    results.push({
      name: k,
      value: obj[k],
      excludeFromIndexes: nonIndexed.indexOf(k) !== -1,
    });
  });
  return results;
}

// Lists all favours in the Datastore sorted alphabetically by title.
// The ``limit`` argument determines the maximum amount of results to
// return per page. The ``token`` argument allows requesting additional
// pages. The callback is invoked with ``(err, favours, nextPageToken)``.
// [START list]
function list(limit, token, cb) {
  const q = ds
    .createQuery([kind])
    .limit(limit)
    .order('title')
    .start(token);

  ds.runQuery(q, (err, entities, nextQuery) => {
    if (err) {
      cb(err);
      return;
    }
    const hasMore =
      nextQuery.moreResults !== Datastore.NO_MORE_RESULTS
        ? nextQuery.endCursor
        : false;
    cb(null, entities.map(fromDatastore), hasMore);
  });
}
// [END list]

// Creates a new favor or updates an existing favor with new data. The provided
// data is automatically translated into Datastore format. The favor will be
// queued for background processing.
// [START update]
function update(id, data, cb) {
  let key;
  if (id) {
    key = ds.key([kind, parseInt(id, 10)]);
  } else {
    key = ds.key(kind);
  }

  const entity = {
    key: key,
    data: toDatastore(data, ['description']),
  };

  ds.save(entity, err => {
    data.id = entity.key.id;
    cb(err, err ? null : data);
  });
}
// [END update]

function create(data, cb) {
  update(null, data, cb);
}

function read(id, cb) {
  const key = ds.key([kind, parseInt(id, 10)]);
  ds.get(key, (err, entity) => {
    if (!err && !entity) {
      err = {
        code: 404,
        message: 'Not found',
      };
    }
    if (err) {
      cb(err);
      return;
    }
    cb(null, fromDatastore(entity));
  });
}

function _delete(id, cb) {
  const key = ds.key([kind, parseInt(id, 10)]);
  ds.delete(key, cb);
}

// [START exports]
module.exports = {
  create,
  read,
  update,
  delete: _delete,
  list,
};
// [END exports]
