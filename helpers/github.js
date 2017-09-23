const request = require('request');
const config = require('../config.js');
const Promise = require('bluebird');

let getReposByUsername = (username) => {
  let options = {
    method: 'GET',
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => error ? reject(error) : resolve(JSON.parse(body)));
  });
}

module.exports.getReposByUsername = getReposByUsername;