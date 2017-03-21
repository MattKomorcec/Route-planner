
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
var express         = require('express');
var User            = require('../models/user');
var jwt             = require('jsonwebtoken'); // used to create, sign, and verify tokens
var superSecretCode = require('./superSecretCode.js');

module.exports = function(req, res) {

  // Find the user
  User.findOne({ username: req.body.username }, function(err, user) {

      console.log(req.body.username)
    // If there was an error
    if(err) throw err;

    // If the user doesn't exist
    if(!user) {
        res.status(404);
        res.json({ 
          success: false, 
          message: 'Authentication failed. User not found.' 
        });
    } 
    // If the user exists
    else if(user) {
        var sendUser = user.userInfo;
        sendUser.username = user.username;

        res.json(
            {
                success: true,
                user: sendUser,
                message: 'User found, here is the info'
            }
        )
    }

  });
}
