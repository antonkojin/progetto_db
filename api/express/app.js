const express = require('express')
const auth = require('basic-auth')

const app = express()

// CORS support
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function(req, res, next) {
    var user = auth(req)
    if (!user) {
        res.status(401);
        res.set('WWW-Authenticate', 'Basic realm="simple"')
    }
    next();
});


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// database connection example
var pgp = require('pg-promise')(/* init options */)
var db = pgp('postgres://username:password@host:port/database')

db.one('SELECT $1 AS value', 123) // returns one row (.many() returns many rows and .any() gives no fucks)
  .then(function (data) {
    console.log('DATA:', data.value)
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })

