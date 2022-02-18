const fs = require('fs');
const path = require('path');
const models = require('../models/pokemonModels.js');

const { Pokemon } = models;

const fileController = {};


fileController.getPokemonDB = (req, res, next) => {
  Pokemon.find({})
    .then((data) => {
      res.locals = data;
      next();
    }).catch(err => {
      return next({
        log: `fileController.getPokemonDB: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
        message: { err: 'fileController.getPokemonDB: ERROR: Check server logs for details' },
      });
  });
};

// ADD MIDDLEWARE TO GET FAVORITE CHARACTERS HERE
fileController.getCaptured = (req, res, next) => {
  fs.readFile(path.resolve(__dirname, '../data/captured.json'), 'UTF-8',
    (err, data) => {
      if (err) {
        return next({
          log: `fileController.getCaptured: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
          message: { err: 'fileController.getCaptured: ERROR: Check server logs for details' },
        });
      }
      res.locals.captured = JSON.parse(data);
      return next();
    },
  );
};
  
// ADD MIDDLEWARE TO ADD A FAVORITE CHARACTER HERE
fileController.addCaptured = (req, res, next) => {
  if (!res.locals.captured && typeof res.locals.captured !== 'object') {
    return next({
      log: 'fileController.addFavs: ERROR: Invalid or unfound required data on res.locals object - Expected res.locals.favs to be an object.',
      message: { err: 'fileController.addFavs: ERROR: Check server logs for details' },
    });
  }
  const {id} = req.params;
  console.log('req.params.id:', id);
  console.log('res.locals.captured', res.locals.captured);
  if(res.locals.captured[id]) {
    console.log('have: ', res.locals.favs[id]);
    return next();
  } else {
    res.locals.captured[id] = true;
    fs.writeFile(path.resolve(__dirname, '../data/captured.json'), JSON.stringify(res.locals.captured, null, 2), 'UTF-8',
      (err) => {
        if (err) {
          return next({
            log: `fileController.addFav: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
            message: { err: 'fileController.addFav: ERROR: Check server logs for details' },
          });
        }
        return next();
      }
    );
  }
};

// ADD MIDDLEWARE TO REMOVE A CHARACTER FROM FAVORITES HERE
fileController.removeCaptured = (req, res, next) => {
  if (!res.locals.captured && typeof res.locals.captured !== 'object') {
    return next({
      log: `fileController.removeCaptured: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: 'fileController.removeCaptured: ERROR: Check server logs for details' },
    });
  }
  const {id} = req.params;
  if(!res.locals.captured[id]) {
    return next();
  }
  if(res.locals.captured[id]) {
    delete res.locals.captured[id];
    fs.writeFile(path.resolve(__dirname, '../data/captured.json'), JSON.stringify(res.locals.captured, null, 2), 'UTF-8',
      (err) => {
        if (err) {
          return next({
            log: `fileController.removeCaptured: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
            message: { err: 'fileController.removeCaptured: ERROR: Check server logs for details' },
          });
        }
        return next();
      }
    );
  }
};


module.exports = fileController;
