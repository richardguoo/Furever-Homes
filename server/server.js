/* eslint-disable arrow-body-style */
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser'); 

const app = express();
const PORT = 3000;
const controller = require('./controllers/userController');

app.use(express.json());
app.use(cookieParser());

// incoming requests
app.post('/users', controller.setCookie, (req, res) => {
  return res.status(200).send('Login Successfully');
});

app.get('/dogs', controller.getDogs, (req, res) => {
  return res.status(200).json({ ...res.locals.dogs });
});

app.get('/favorite', controller.getFavs, (req, res) => {
  return res.status(200).json({ ...res.locals.favs });
});

app.post('/favorite', controller.addFavs, controller.getFavs, (req, res) => {
  return res.status(200).json({ ...res.locals.favs });
});

app.post('/delete', controller.deleteFavs, controller.getFavs, (req, res) => {
  return res.status(200).json({ ...res.locals.favs });
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(200).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening at PORT:${PORT}`);
});

module.exports = app;
