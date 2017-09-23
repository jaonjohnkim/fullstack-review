const express = require('express');
const db = require('../database/index');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
// app.use(bodyParser.text());
// app.use(bodyParser.urlencoded({ extended: true }));
app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var username = '';  
  // console.log('request body', req.body);

  req.on('data', (chunk) => {
    username += chunk.toString();
  });
  req.on('end', () => {
    console.log('username search:', username);
    
    db.get(username)
    .then((result) => {
      console.log('CHECKING DB, RESULT:', result);
      if (result.length === 0) {
        console.log('User not found in db, going to Github');
        return github.getReposByUsername(username);
      } else {
        console.log('User found in db, loading from db');
        throw(res);
      }
    })
    .then((result) => {
      console.log('Github got back to us: ', result);
      return db.save(result)
      // res.send(result);
    })
    .then(() => {
      res.redirect('/repos');
    })
    .catch((res) => {
      res.redirect('/repos');
    });
  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // Mongoose has a Model.find method to grab 

  db.get().then((result) => {
    res.send(result);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

