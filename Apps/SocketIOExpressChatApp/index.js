
// Original concept and development by: Grant Timmerman
// Express Adaptation by: Adem Hadrovic 


// Setup basic express server
var express = require('express');
var mongoose = require("mongoose");
var Message = require(__dirname + '/models/message');
var app = express();
var server = require('http').createServer(app);

var io = require('socket.io')(server);
var port = process.env.PORT || 3000;


app.set('views', 'views');
app.set('view engine', 'pug');

// Routing
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
  res.render('index',{title: "Socket IO Chat App"})
})

//use get all of the message in json format
app.get('/messages', function (req, res, next) {
  
    Message.getAll(function(err,docs){
        if(err){
          //send error to error handling middleware
            next(err);
        }
        else{
          res.json(docs); // if data is found, return as json data on page
        }

    });

});

app.get('/messages/:user', function (req, res, next) { 
    
    //we will use the URI as a way to define the type we would like to get.
    Message.getAllByUser(req.params.type, function(err,docs){ // this is just for displaying the data in the browser
        if(err){
          //send error to error handling middleware
            next(err);
        }
        else{
          res.json(docs); // if data is found, return as json data on page
        }

    });

});

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});


// Chatroom

var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });

  Message.create(socket.username,data,function(err,res){
      
  });
  console.log("new message inserted");

  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});


//error-handling middleware
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });