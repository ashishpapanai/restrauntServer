const express = require('express');
const promoRouter = express.Router();
//const promoRouter_id=express.Router();
const bodyParser = require('body-parser');
promoRouter.use(bodyParser.json());
const authenticate = require('../authenticate')
//promoRouter_id.use(bodyParser.json());
const Promo = require('../models/promotion');
const { create } = require('../models/promotion');
const cors = require('./cors');

promoRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Promo.find({})
            .then((promos) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(promos)
            }, (err) => {
                next(err)
            }).catch((err) => {
                next(err)
            })
    })
    .post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promo.create(req.body)
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(promo)
            }, (err) => {
                next(err)
            }).catch((err) => {
                next(err)
            })
    })
    .put(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation is not supported on /promotions');
    }).delete(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promo.remove()
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            }, (err) => {
                next(err)
            }).catch((err) => {
                next(err)
            })
    })

promoRouter.route('/:promoId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Promo.findById(req.params.promoId)
            .then((promos) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(promos)
            }, (err) => {
                next(err)
            }).catch((err) => {
                next(err)
            })
    })
    .post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

        res.statusCode = 403;
        res.end('POST on /parameter/' + req.params.promoId + ' is not allowed.');
    })
    .put(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promo.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, {
            new: true
        })
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(promo)
            }, (err) => {
                next(err)
            }).catch((err) => {
                next(err)
            })
    })
    .delete(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promo.findByIdAndRemove(req.params.promoId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            }, (err) => {
                next(err)
            }).catch((err) => {
                next(err)
            })
    })


module.exports = promoRouter;