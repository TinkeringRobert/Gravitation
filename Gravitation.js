var pjson = require('./package.json');
var bodyParser = require('body-parser');
var express = require('express')
      ,cors = require('cors')
      ,app = express();
var winston = require('winston');

var _ = require('lodash');
var url  = require('url');

const http = require('http');
//*************************************************************************
// Application settings
//*************************************************************************
var isWin = /^win/.test(process.platform);
if (isWin){
  var params = require('../Gravitation/Windows');
}
else{
  var params = require('../Gravitation/Linux');
}
//{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
winston.level = 'silly';

//*************************************************************************
// Local requires
//*************************************************************************

//*************************************************************************
// Service http functions
//*************************************************************************
var originsWhitelist = [
  'http://localhost:4200',
  'http://' + params.server_ip + ':' + params.application_port.wormhole,
  'http://http://94.215.26.169' + ':' + params.application_port.wormhole,
];

var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:false
}

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/status', function (req, res) {
  res.json(
    {
      status: 'online',
      application: pjson.name,
      version: pjson.version,
      description: pjson.description
    }
  );
});

_.forEach(params.applications, function(application) {
  var app_url = '/' + application.name + '';

  app.get(app_url + "/*", function (req, res) {
    var url_parts = url.parse(req.url, true).href;
    var url_sub = _.replace(url_parts, app_url, '');

    winston.debug('Got get request for ' + application.name + ' : ' + application.port);
    winston.silly('http://' + params.server_ip + ':' + application.port + url_sub);

    http.get('http://' + params.server_ip + ':' + application.port + url_sub, (resp) => {
      var data = '';
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => { data += chunk; });
      // The whole response has been received. Print out the result.
      resp.on('end', () => { return res.send(data); });

    }).on("error", (err) => {
      winston.error("Error: " + err.message);
      res.statusCode = 500;
      res.send(err);
    });
  });

  app.post(app_url + "/*", function (req, res) {
    var url_parts = url.parse(req.url, true).href;
    var url_sub = _.replace(url_parts, app_url, '');

    winston.debug('Got post request for ' + application.name + ' : ' + application.port);
    winston.silly('http://' + params.server_ip + ':' + application.port + url_sub);
    
    const options = {
      hostname: params.server_ip,
      port: application.port,
      path: url_sub,
      method: 'POST'//,
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded',
      //   'Content-Length': Buffer.byteLength(postData)
      // }
    };

    const request = http.request(options, (result) => {
      var data = '';
      result.setEncoding('utf8');
      // A chunk of data has been recieved.
      result.on('data', (chunk) => { data += chunk; });
      // The whole response has been received. Print out the result.
      result.on('end', () => { return res.send(data); });
    });

    request.on('error', (err) => {
      winston.error("Error: " + err.message);
      res.statusCode = 500;
      res.send(err);
    });

    // write data to request body
    request.write('');
    request.end();
  });

  // app.put(app_url + "/*", function (req, res) {
  //   winston.debug('Got put request for ' + application.name + ' : ' + application.port);
  //   var url_parts = url.parse(req.url, true).href;
  //   var url_sub = _.replace(url_parts, app_url, '');
  //   winston.silly('http://'+params.server_ip+':'+application.port+url_sub);
  //   http.put('http://' + params.server_ip + ':' + application.port + url_sub, (resp) => {
  //     var data = '';
  //     // A chunk of data has been recieved.
  //     resp.on('data', (chunk) => { data += chunk; });
  //
  //     // The whole response has been received. Print out the result.
  //     resp.on('end', () => { return res.send(data); });
  //
  //   }).on("error", (err) => {
  //     winston.error("Error: " + err.message);
  //     return res.send(data);
  //   });
  // });

  // app.delete(app_url + "/*", function (req, res) {
  //   winston.debug('Got delete request for ' + application.name + ' : ' + application.port);
  //   var url_parts = url.parse(req.url, true).href;
  //   var url_sub = _.replace(url_parts, app_url, '');
  //   winston.silly('http://'+params.server_ip+':'+application.port+url_sub);
  //   http.delete('http://' + params.server_ip + ':' + application.port + url_sub, (resp) => {
  //     var data = '';
  //     // A chunk of data has been recieved.
  //     resp.on('data', (chunk) => { data += chunk; });
  //
  //     // The whole response has been received. Print out the result.
  //     resp.on('end', () => { return res.send(data); });
  //
  //   }).on("error", (err) => {
  //     winston.error("Error: " + err.message);
  //     return res.send(data);
  //   });
  // });
});

// routes ======================================================================
function initialize(){
  console.log('Boot Gravitation server :: ' + pjson.name + ' :: ' + pjson.version);

  // Activate website
  app.listen(params.application_port.gravitation, function () {
      console.log('Server gestart op poort ' + params.application_port.gravitation);
  });

  winston.info("System started");
};

initialize();
