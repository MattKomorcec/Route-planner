
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
var express         = require('express');
var User            = require('../models/user');
var jwt             = require('jsonwebtoken'); // used to create, sign, and verify tokens
var superSecretCode = require('./superSecretCode.js');

module.exports = function(req, res) {

  // Find the user
  User.findOne({ username: req.body.username }, function(err, user) {

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

      // Check if password matches
      if(user.password !== req.body.password) {
        res.status(404);
        res.json({ 
            success: false, 
            message: 'Authentication failed. Wrong password.' 
        });
      } 
      else {

        // If user is found and password is right create a token
        var token = jwt.sign(user, superSecretCode, {
          expiresIn: '24h' // set the token to expire in 24h
        });

        // Return the information including the token as JSON
        res.json({
          success: true,
          message: 'User found!',
          username: user.username,
          token: token
        });
      }   

    }

  });
}
