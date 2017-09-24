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
  .then((dbResult) => {
    return github.getReposByUsername(username)
    .then((result) => {
      if (dbResult.length === 0) {
        return db.save(result);
      } else if (dbResult.length !== result.length) {
        var diff = result.reduce((acc, githubRepo, i) => {
          if (!dbResult.some(dbRepo => dbRepo.id === githubRepo.id)) {
            acc.push(githubRepo);
          }
          return acc;
        }, []);
        return db.save(diff);
      }
    })
  })
  .then(() => res.redirect('/repos'));
});

app.get('/repos', (req, res) => db.get().then(result => res.send(result)));

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

