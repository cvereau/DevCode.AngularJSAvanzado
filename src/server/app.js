/**
 * Created by cvereau on 12/15/15.
 */

//setup
var express = require("express");
var http = require("http");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");
var routes;

var server = http.createServer(app);
var io = require("socket.io").listen(server);

//configuration
app.use(morgan('dev')); //hacer un log de cada request de mi App
app.use(bodyParser.urlencoded({extended: true})); //parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //parse application/json
app.use(favicon(__dirname + '/favicon.ico'));

app.use('/', express.static('./src/client'));
app.use('/', express.static('./node_modules'));

//set the node routes
routes = require('./routes/index')(app);

//initialize socket.io
io.on('connection', function (socket) {
    var data = {
        cpuPct : 10.0,
        bandWith: 20.0,
        time: new Date()
    };

    setInterval(function(){

        socket.emit('metricServiceDataEvent', data);

        var r = Math.random();
        data.cpuPct += 15 * r - 7.5;
        if(data.cpuPct > 100) data.cpuPct = 100;
        if(data.cpuPct < 0) data.cpuPct = 0;

        data.time = new Date();

    }, 1000);

    var firstNames = ['Jorge','Diana','Cesar','Pedro',
        'Ronald','Geraldine','Rosa','Maria','Jesus','Cristian'];

    var lastNames = ['Boneu','Bruno','Vereau','Garcia',
        'Yuquivilca','Figueroa','Damazo','Soulet','Piedra','Mendez'];

    var messages = ['Sign On','Sign Off','Invalid Password','Ilegal IP Address'];

    setInterval(function () {
        var firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        var lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        var message = messages[Math.floor(Math.random() * messages.length)];

        socket.emit('security event',{
            name: firstName + ' ' + lastName,
            event: message,
            datetime:  new Date()
        });
    }, 500);


});

//aplication
app.get('*', function (req, res) {
    res.sendfile('./src/client/index.html');
    //cargar el unico archivo de vista general , index.html
});

//listen
server.listen(8000);
console.log("app escuchando por el puerto 8000");