// dependencies
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var hash = require('bcryptjs');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

// mongoose
mongoose.connect('mongodb://localhost:27017/ferari');

// user schema/model
var User = require('./models/user.js');

// create instance of express
var app = express();

var server = require('http').Server(app);
var io = require('socket.io').listen(server);

// require routes
var routes = require('./routes/api.js');

// define middleware
app.use(express.static(path.join(__dirname, '../client/app')));
app.use('/bower_components', express.static('../client/bower_components/'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/user/', routes);

var db; 

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/ferari", function(err, database) {
  if(err) throw err;
  db = database;
});

var ObjectId = require('mongodb').ObjectID;

  //Get all events from events collection
  app.get('/events', function(req, res){
    db.collection('events').find({}).sort({OccurrenceTime: -1}).toArray(function(err, docs) {
      if (err) {
        assert.equal(null);
      }
      else {
        //console.log(docs);
          res.json(docs);
      } 
    });
  });

  //Get number of events in last hour
    app.get('/onehour', function(req, res){
    db.collection('events').aggregate([
      {
        $match: {
          $and: [
            {
              OccurrenceTime: {
                 $gte: new Date().getTime() - 1000 * 60 * 60
              }
            },
            {
              OccurrenceTime: {
                $lte: new Date().getTime()
              }
            }
          ]
        }
      },
      {
        $group: {
          _id : '$Name', NO : {$sum: 1 }
        }
      },
      {
        $project: { 
          _id:0, Name: '$_id', NO: 1
        }
      }
    ]).toArray(function(err, docs) {
      if (err) {
        assert.equal(null);
      }
      else {
        //console.log(docs);
          res.json(docs);
      }
    });
  });

    //Get number of events in last six hours
  app.get('/sixhours', function(req, res){
    db.collection('events').aggregate([
      {
        $match: {
          $and: [
            {
              OccurrenceTime: {
                 $gte: new Date().getTime() - 6000 * 60 * 60
              }
            },
            {
              OccurrenceTime: {
                $lte: new Date().getTime()
              }
            }
          ]
        }
      },
      {
        $group: {
          _id : '$Name', NO : {$sum: 1 }
        }
      },
      {
        $project: { 
          _id:0, Name: '$_id', NO: 1
        }
      }
    ]).toArray(function(err, docs) {
      if (err) {
        assert.equal(null);
      }
      else {
        //console.log(docs);
          res.json(docs);
      }
    });
  });

  app.get('/countSixHours', function(req, res){
    db.collection('events').aggregate([
      {
        $match: {
          $and: [
            {
              OccurrenceTime: {
                 $gte: new Date().getTime() - 6000 * 60 * 60
              }
            },
            {
              OccurrenceTime: {
                $lte: new Date().getTime()
              }
            }
          ]
        }
      },
      {
        $group: {
          _id : null, count: {$sum: 1 }
        }
      },
      {
        $project: { 
          _id:0, count: 1
        }
      }
    ]).toArray(function(err, docs) {
      if (err) {
        assert.equal(null);
      }
      else {
        //console.log(docs);
          res.json(docs);
      }
    });
  });

  app.get('/count24hours', function(req, res){
    db.collection('events').aggregate([
      {
        $match: {
          $and: [
            {
              OccurrenceTime: {
                 $gte: new Date().getTime() - 24000 * 60 * 60
              }
            },
            {
              OccurrenceTime: {
                $lte: new Date().getTime()
              }
            }
          ]
        }
      },
      {
        $group: {
          _id : null, count: {$sum: 1 }
        }
      },
      {
        $project: { 
          _id:0, count: 1
        }
      }
    ]).toArray(function(err, docs) {
      if (err) {
        assert.equal(null);
      }
      else {
        //console.log(docs);
          res.json(docs);
      }
    });
  });

  //Get number of events in past day
  app.get('/24hours', function(req, res){
    db.collection('events').aggregate([
      {
        $match: {
          $and: [
            {
              OccurrenceTime: {
                 $gte: new Date().getTime() - 24000 * 60 * 60
              }
            },
            {
              OccurrenceTime: {
                $lte: new Date().getTime()
              }
            }
          ]
        }
      },
      {
        $group: {
          _id : '$Name', NO : {$sum: 1 }
        }
      },
      {
        $project: { 
          _id:0, Name: '$_id', NO: 1
        }
      }
    ]).toArray(function(err, docs) {
      if (err) {
        assert.equal(null);
      }
      else {
          //console.log(docs);
          res.json(docs);
      }
    });
  });


  //Get subscriber data from subscriber collection
    app.get('/subscriber/:calling_number', function(req, res){
      var calling_number = req.params.calling_number;
      console.log(calling_number);
    db.collection('subscriber').findOne({calling_number: calling_number},function(err, docs) {
      if (err) {
        assert.equal(null);
      }
      else {
          //console.log(docs);
          res.json(docs);
      } 
    });
  });

  //Get detail event data from events collection
    app.get('/derived/:_id', function(req, res){
      var calling_number = req.params.calling_number;
      var _id = req.params._id;
      console.log(calling_number);
      var name = req.params.Name;
      console.log(_id);

      var query = [ 
        {   $unwind: "$call_start_dates" },
        {
        $match: {
          "_id": new ObjectId(_id)
        }
      },
            {   
              $group: {
                    _id: "$_id",
                    call_start_dates: { $addToSet: "$call_start_dates" },
                    called_numbers: { $first: "$called_numbers" },
                    other_party_tel_numbers: { $first: "$other_party_tel_numbers" },
                    conversation_durations: { $first: "$conversation_durations" }
                }
            },
            {
                $unwind: {
                    path: "$call_start_dates",
                    includeArrayIndex: "idx"
                }
            },
            { 
                $project: { 
                    _id: 1, 
                    call_start_dates: 1, 
                    called_numbers: { 
                        $arrayElemAt: ["$called_numbers", "$idx"] 
                    },
                    other_party_tel_numbers: { 
                        $arrayElemAt: ["$other_party_tel_numbers", "$idx"] 
                    }, 
                    conversation_durations: { 
                        $arrayElemAt: ["$conversation_durations", "$idx"]
                    }
                }
            }
    ];

    db.collection('events').aggregate(query).toArray(function(err, docs) {
      if (err) {
        assert.equal(null);
      }
      else {
          //console.log(docs);
          res.json(docs);
      } 
    });
  });

  //TO DO - napraviti match još po call_start_date-u
  app.get('/longcallatnight/:calling_number', function(req, res){
      var calling_number = req.params.calling_number;
      console.log(calling_number);

    db.collection('events').findOne({calling_number: calling_number},function(err, docs) {
      if (err) {
        assert.equal(null);
      }
      else {
          //console.log(docs);
          res.json(docs);
      } 
    });
  });


  //API for mostfrequent customer
  app.get('/mostfrequent', function(req, res){

      var query = [
        {   
          $unwind: '$called_numbers'
        }, 
        {
            $group: {
                _id : '$called_numbers',  
                no_occurence: {$sum: 1 },
            }
        },
        {
            $project: { 
                _id: 0, called_number: '$_id', no_occurence: 1
            }
        },
        { 
          $sort : { 
            no_occurence : -1,
          } 
        }
      ];

    db.collection('events').aggregate(query).toArray(function(err, docs) {
      if (err) {
        assert.equal(null);
      }
      else {
          //console.log(docs);
          res.json(docs);
      } 
    });
  });

  app.get('/email/:username', function(req,res) {
    var username = req.params.username;
    db.collection('users').findOne({username: username},function(err, docs) {
      if (err) {
        assert.equal(null);
      }
      else {
          //console.log(docs);
          res.json(docs);
      } 
    });
  });

// error hndlers
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});
*/
io.sockets.on('connection', function(socket){

    socket.on("fraudEvents", function(message) {
      io.emit("message",  message);
      //console.log(message);
    });

    //transform realtime data for onehour chart - only DERIVED_EVENT_NAME and NO needed
    socket.on("fraudEvents", function(lasthour,callback) {
  
      callback("");
      io.emit("lasthour", " [ " + lasthour + "]");
      
  });

    socket.on('disconnect', function() {
        //subscribe.quit();
    });
});

module.exports = app;

server.listen(3000, function () {
    'use strict';
});