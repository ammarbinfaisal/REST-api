const express = require('express');
const { parse } = require('url');
const router = express.Router();
const { MongoClient } = require('mongodb');

// variables for mongodb connection
const url = 'mongodb://localhost:27017';
const dbName = 'developers';

MongoClient.connect(url, function(err, client) {
  
  if (err) {
    return console.log(err);
  }

  const db = client.db(dbName);

  //GET request handler
  router.get('/developers/:name', (req, res) => {
    
    const { name } = req.params;

    db
      .collection('developers')
      .findOne({ name })
      .then(response => {
        res.send(
          response !== null
            ? JSON.stringify(response, undefined, 4) + '\n'
            : 'No matches found\n'
        );
      })
      .catch(err => {
        res.send(
          'An error occured in finding the name of the developer in the db'
        );
      });
  });

  //POST request handler
  router.post('/developers/:name-:age', (req, res) => {
  
    const { name, age } = req.params;

    db
      .collection('developers')
      .insertOne({ name, age })
      .then(response => {
        res.send(
          `successfully posted and the db response is as follows \n${JSON.stringify(
            response,
            undefined,
            4
          )}\n`
        );
      })
      .catch(err => {
        res.send(`An error occured and here is it\n${err}\n`);
      });
  
  });

  //PUT request handler
  router.put('/developers/:name-:age', (req, res) => {
  
    const { name, age } = req.params;

    db
      .collection('developers')
      .findOneAndUpdate({ name }, { name, age })
      .then(response => {
        res.send(
          `successfull put and the db response is as follows \n${JSON.stringify(
            response,
            undefined,
            4
          )}\n`
        );
      })
      .catch(err => {
        res.send(`An error occured and here is it\n${err}\n`);
      });
  
  });

  //DELETE request handler
  router.delete('/developers/:name', (req, res) => {
  
    const { name, age } = req.params;

    db
      .collection('developers')
      .findOneAndDelete({ name })
      .then(response => {
        res.send(
          `successfully deleted and the db response is as follows \n${JSON.stringify(
            response,
            undefined,
            4
          )}\n`
        );
      })
      .catch(err => {
        res.send(`An error occured and here is it\n${err}\n`);
      });
  
  });
});

module.exports = router;
