var express     = require('express');
var users       = require('./users.js');
var register    = require('./register.js');
var token       = require('./token.js');
var middleware  = require('./middleware.js');
var userinfo    = require('./userinfo.js');

var apiRoutes = express.Router();

apiRoutes.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
})

apiRoutes.post('/token', token);
apiRoutes.post('/register', register);

apiRoutes.get('/', function(req, res) {
    res.json({ 
        message: 'This is the root route. Nothing to see here, move along.' 
    });
})
apiRoutes.use(middleware);
apiRoutes.get('/users', users);
apiRoutes.post('/user', userinfo);

module.exports = apiRoutes;