const Yelp = require('yelp');
const apikeys = require('./../config/yelp-api.js');
const fs = require('fs');

const yelp = new Yelp(apikeys);

// See http://www.yelp.com/developers/documentation/v2/search_api

// Change/Update this data by running node yelpRequest.js

const queries = [{
  term: 'food',
  ll: '37.788022,-122.399797',
}, {
  term: 'nightlife',
  ll: '37.788022,-122.399797',
}, {
  term: 'active',
  ll: '37.788022,-122.399797',
}];

const files = ['eatData.json', 'drinkData.json', 'playData.json'];

// make req and write to corresponding files for dummy data to
// avoid overloading api / testing

queries.forEach((searchTerm, i) => {
  yelp.search(searchTerm)
    .then((data) => {
      fs.writeFile(files[i], JSON.stringify(data), (err) => {
        if (err) console.log(err);
        console.log(`Writing to ${files[i]}`);
      });
    })
    .catch((err) => {
      console.error(err);
    });
});
