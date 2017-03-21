
// route to register a user (POST http://localhost:8080/api/register)
var express = require('express');
var User    = require('../models/user');

module.exports = function(req, res) {

  // If a request contains a body with both username and password, and they're not empty, try to create a user
  if(req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password') && req.body.username !== '' && req.body.password !== '') {

    User.find({ username: req.body.username }, function(err, user) {
        if(err) throw err;
        
        // if a user doesn't exist
        if(user.length === 0) {
            var newUser = new User({ 
                username: req.body.username, 
                password: req.body.password
            });

            // save the user to the database
            newUser.save(function(err) {
                if (err) throw err;

                console.log('User registered');
                res.json({ success: true });
            });
        }
        // if a user exists, it means it's already registered'
        else {
                console.log('User is already registered!');
                res.json({
                    success: false,
                    message: 'That user is already registered!'
                });
        }
    })

  }
  // Otherwise, return an error
  else {
    res.json({ 
        success: false,
        message: 'No username or password supplied.' 
    });
  }

};