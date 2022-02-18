const express = require('express');
const app = express();
const path = require('path');



app.use(express.json());
const pokemonController = require('./controllers/pokemonController.js');
const fileController = require('./controllers/fileController.js');

app.get('/kanto', pokemonController.getPokemon, (req, res) => {
  return res.status(200).send(JSON.stringify(res.locals.pokemon));
});

app.get('/', (req, res) => { //fileController.getPokemonDB,
  res.status(200).send(res.locals);
});

app.get('/getpokemon', fileController.getPokemonDB, (req, res) => {
  res.status(200).send(res.locals);
});

// statically serve everything in the build folder on the route '/build'
if (process.env.NODE_ENV === 'production') {
app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
}


app.use('*', (req, res) => res.sendStatus(404));


/**
 * configire express global error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

 app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }, 
  };
  if(!res.locals.message) {
    console.log(defaultErr.log);
    return res.status(defaultErr.status).send(defaultErr.message.err);
  } else {
    res.locals.message = err.message;
    console.log('ERROR: ', err);
    const errorStatus = err.status || 500;
    return res.status(errorStatus).send(res.locals.message);
  }
});


app.listen(3000); //listens on port 3000 -> http://localhost:3000/

