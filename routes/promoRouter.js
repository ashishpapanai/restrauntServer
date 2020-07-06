const express = require('express');
const promoRouter = express.Router();
//const promoRouter_id=express.Router();
const bodyParser = require('body-parser');
promoRouter.use(bodyParser.json());
//promoRouter_id.use(bodyParser.json());
const Promo = require('../models/promotion');
const { create } = require('../models/promotion');

promoRouter.route('/')
    .get((req, res, next) => {
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
    }).post((req, res, next) => {
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
    }).put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation is not supported on /promotions');
    }).delete((req, res, next) => {
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
    .get((req, res, next) => {
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
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST on /parameter/' + req.params.promoId + ' is not allowed.');
    })
    .put((req, res, next) => {
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
    .delete((req, res, next) => {
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