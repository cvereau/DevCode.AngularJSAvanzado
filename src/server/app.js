/**
 * Created by cvereau on 12/15/15.
 */

//setup
var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");
var routes;

//configuration
app.use(morgan('dev')); //hace un log de cada request al console
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(favicon(__dirname + '/favicon.ico'));

app.use('/', express.static('./src/client/')); //setea los archivos estaticos a /src/client

routes = require('./routes/index')(app);

//application
app.get('*', function(req, res) {
    res.sendfile('./src/client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

//listen (la app empieza con node app.scripts)
app.listen(8080);
console.log("app listening on port 8080");