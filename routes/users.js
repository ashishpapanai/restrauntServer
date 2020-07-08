const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/users.js');
const authenticate = require('../authenticate');
const userRouter = express.Router();
const passport = require('passport');

userRouter.use(bodyParser.json());

userRouter.post('/signup', (req, res, next) => {
    User.register(new User({ username: req.body.username, name: req.body.name, admin: req.body.admin }),
        req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: err });
            }
            else {
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: true, status: 'Registration Successful!' });
                });
            }
        });
});


userRouter.post('/login', passport.authenticate('local'), (req, res) => {
    console.log(req.user);
    var token = authenticate.getToken({ _id: req.user._id });
    console.log(token);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'You are successfully logged in!' });
});

userRouter.route('/')
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        User.find({}).then(users => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(users);
        }, (err) => next(err))
            .catch((err) => next(err));
    })

userRouter.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    }
    else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
    }
});


module.exports = userRouter;