
// route to return all users (GET http://localhost:8080/api/users)
var express = require('express');
var User    = require('../models/user');

module.exports = function(req, res) {
    User.find({}, function(err, user) {
        if(err) throw err;

        res.json(user);
    })
};