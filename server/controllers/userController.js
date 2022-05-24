/* eslint-disable max-len */
const axios = require('axios');
const db = require('../models/ProjectModel');

const controller = {};

const APIKEY = 'K33RQszolqYGUj7DO35LS3lOB8ovvZhc9jiQJnxUACvjpRUmS3';
const SECRETKEY = '65cJF3eiti2raYn6hrvcsV2sFoqa3HnAkOOSiPUF';
let dogRequest;

async function createDogRequest() {
  await axios({
    method: 'post',
    url: 'https://api.petfinder.com/v2/oauth2/token',
    data: { grant_type: 'client_credentials', client_id: APIKEY, client_secret: SECRETKEY },
  })
    .then((resp) => {
      const accessToken = resp.data.access_token;
      dogRequest = {
        method: 'get',
        headers: { Authorization: `Bearer ${accessToken}` },
      };
    });
}

createDogRequest();

controller.getDogs = (req, res, next) => {
  let dogRequestUrl = 'https://api.petfinder.com/v2/animals?type=dog';

  for (const trait in req.query) {
    if (req.query[trait] !== '') dogRequestUrl += `&${trait}=${req.query[trait]}`;
  }

  dogRequest.url = dogRequestUrl;

  axios(dogRequest)
    .then((resp) => {
      res.locals.dogs = resp.data;
      return next();
    })
    .catch((err) => console.log(err));
};

controller.setCookie = (req, res, next) => {
  res.cookie('userId', req.body.sub);
  return next();
};

controller.getFavs = (req, res, next) => {
  const getFavs = `SELECT * FROM favorites WHERE user_id::numeric = ${req.cookies.userId}`;
  db.query(getFavs)
    .then((data) => {
      res.locals.favs = data.rows;
      return next();
    });
};

controller.addFavs = (req, res, next) => {
  const datas = [req.cookies.userId, req.body.favs_id, req.body.breed, req.body.age, req.body.color, req.body.gender, req.body.image, req.body.url, req.body.name];
  const addFavs = 'INSERT INTO favorites("user_id", "favs_id", "breed", "age", "color", "gender", "image", "url", "name") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;';
  db.query(addFavs, datas)
    .then((data) => next())
    .catch((err) => {
      console.log('query error', err);
      next(err);
    });
};

controller.deleteFavs = (req, res, next) => {
  const datas = [req.cookies.userId, req.body.favs_id];
  const deleteFavs = 'DELETE FROM favorites WHERE user_id = $1 AND favs_id = $2';

  db.query(deleteFavs, datas)
    .then(() => next())
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports = controller;
