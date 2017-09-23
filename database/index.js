const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
const Promise = require('bluebird');

let repoSchema = mongoose.Schema({
  'id': Number,
  'name': String,
  'full_name': String,
  'owner': {
    'login': String,
    'html_url': String
  },
  'html_url': String,
  'description': String,
  'url': String,
  'stargazers_count': Number,
  'forks_count': Number
});

let Repo = mongoose.model('Repo', repoSchema);

module.exports.save = (repoData) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  return new Promise((resolve, reject) => {
    repoData.forEach((repo) => {
      var repo = new Repo (repo);
      // POST request to MongoDB
      repo.save((err, repo) => {
        if (err) { return console.error(err); }
        console.log('Saved to DB', repo);
      });
    });
    resolve();
  });
}

module.exports.get = (username) => {
  if (username) {
    return Repo.find({ 'owner.login': username });
  } else {
    return Repo.find({}).limit(25).sort({stargazers_count: -1});
  }
}

// module.exports.save = save;