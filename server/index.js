const express = require('express');
const db = require('../database/index');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text());  

app.post('/repos', function (req, res) {
  var username = req.body;
  db.get(username)
  .then((result) => !result.length ? 
    github.getReposByUsername(username) : res.redirect('/repos'))
  .then((result) => db.save(result))
  .then(() => res.redirect('/repos'));
});

app.get('/repos', (req, res) => db.get().then((result) => res.send(result)));

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

