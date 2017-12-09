var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
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


router.get('/',function (req,res) {
  res.render('maps/index',{title:"EmbeddedMApp", searchType: ""})
});

//the map for food
router.get('/food', function (req, res) {
  
    res.render('maps/index', {
      title: 'Food Near Me',
      searchType: 'food'
  });

});

//the map for drinks
router.get('/drink', function (req, res) {

    res.render('maps/index', {
      title: 'Cafes and Bars Near Me',
      searchType: 'drink'
  });

});

//map for hotels
router.get('/hotel', function (req, res) {
  
    res.render('maps/index', {
      title: 'Lodging Near Me',
      searchType: 'lodging'
  });

});

//map for entertainment
router.get('/entertainment', function (req, res) {
  
    res.render('maps/index', {
      title: 'Entertainment Near Me',
      searchType: 'entertainment'
    });
  
});

//map for shopping
router.get('/shopping', function (req, res) {

    res.render('maps/index', {
      title: 'Shopping Near Me',
      searchType: 'shopping'
  });

});

router.get('/parking', function (req, res) {

    res.render('maps/index', {
      title: 'Parking Near Me',
      searchType: 'parking'
  });

});

router.get('/bank', function (req, res) {

    res.render('maps/index', {
      title: 'Banks and ATMs Near Me',
      searchType: 'bank'
  });

});

router.get('/worship', function (req, res) {

    res.render('maps/index', {
      title: 'Places of Worship Near Me',
      searchType: 'place_of_worship'
    });

});
