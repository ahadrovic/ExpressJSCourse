var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Place = require('../models/place')

module.exports = function (app) {
  app.use('/places', router);
};


/*
router.get('/', function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});
*/

router.get('/all',function (req,res) {
 Place.getAll(function (err,docs) {
   if (err) {
    next(err);
   }
   else{
    res.json(docs)
   }
 })
});

router.get('/all/:type',function (req,res) {
 Place.getByType(req.params.type,function (err,docs) {
   if (err) {
    next(err);
   }
   else{
    res.json(docs)
   }
 })
});