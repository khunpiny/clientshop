// server.js
// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

//Database setup
// var project = require('./models/project');
var Projects = [{
    "id": 0,
    "message": "IPhone5",
    "pic": "ip5.jpg",
    "share": 29900
  },
  {
    "id": 1,
    "message": "IPhone7",
    "pic": "ip7.png",
    "share": 34500
  },
  {
    "id": 2,
    "message": "Samsung Galaxy S7",
    "pic": "s7.jpg",
    "share": 19900
  },
  {
    "id": 3,
    "message": "เตาอบไมโครเวฟ อุ่นอาหาร",
    "pic": "elec1.jpg",
    "share": 2790 
  },
  {
    "id": 4,
    "message": "หม้อหุงข้าว ดิจิตอล 1.8 L",
    "pic": "elec2.jpg",
    "share": 2589 
  },
  {
    "id": 5,
    "message": "หม้อหุงข้าว - รุ่น RZ-VMC10",
    "pic": "elec3.jpg",
    "share": 2490 
  },
  {
    "id": 6,
    "message": "แอร์ติดผนังแบบ ECONO",
    "pic": "elec4.jpg",
    "share": 16389 
  },
  {
    "id": 7,
    "message": "แอร์เคลื่อนที่ NATURAL 12000BTU",
    "pic": "elec5.jpg",
    "share": 8990 
  },
  {
    "id": 8,
    "message": "Triple3Shop ชุดเซ็ท พร้อม ทำเบเกอรี่",
    "pic": "elec6.jpg",
    "share": 7939  
  }
];
var Buystores = [
];
var Sums = [
  {
    "id": 0,
    "sums": 0
  }
]; 

var buystoreIndex = 0;
var projectIndex = 9;
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});

// more routes for our API will happen here
// on routes that end in /project

// get all the project (accessed at GET http://localhost:8080/api/project)
router.route('/projects')
  .get(function(req, res) {
    // res.json(project.findAll());
    res.json(Projects);
  });
// get all the buystore
router.route('/buystores')
  .get(function(req, res) {
    // res.json(project.findAll());
    res.json(Buystores);
  });

// create a bear (accessed at POST http://localhost:8080/api/project)
router.route('/projects')
  .post(function(req, res) {
    var project = {};
    project.id = projectIndex++;
    project.message = req.body.message;
    project.pic = req.body.pic;
    project.share = req.body.share;
    //project.save(bear);
    Projects.push(project);
    res.json({
      message: 'Project created!'
    });
  });

  // create a buystore (accessed at POST http://localhost:8080/api/project)
router.route('/buystores')
  .post(function(req, res) {
    var buystore = {};
    buystore.id = buystoreIndex++;
    buystore.message = req.body.message;
    buystore.pic = req.body.pic;
    buystore.share = req.body.share;
    //project.save(bear);
    Buystores.push(buystore);
    res.json({
      message: 'buystore created!'
    });
  });

// on routes that end in /project/:project_id
router.route('/projects/:project_id')
 // get the bear with that id (accessed at GET http://localhost:8080/api/project/:project_id)
  .get(function(req, res) {
    res.json(Projects[req.params.project_id]);
  })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/project/:project_id)
  .put(function(req, res) {
    // use our bear model to find the bear we want
    Projects[req.params.project_id].message = req.body.message; // update the project info
    Projects[req.params.project_id].pic = req.body.pic; // update the project info
    Projects[req.params.project_id].share = req.body.share; // update the project info
    res.json({
      message: 'Project updated!'
    });
  })

  // delete the bear with this id (accessed at DELETE http://localhost:8080/api/project/:project_id)
  .delete(function(req, res) {
    delete Projects[req.params.project_id]
    res.json({
      message: 'Project deleted!'
    });
  })

// on routes that end in /buystore/:buystore_id
router.route('/buystores/:buystore_id')

  // get the buystore with that id (accessed at GET http://localhost:8080/api/project/:project_id)
  .get(function(req, res) {
    res.json(Buystores[req.params.buystore_id]);
  })

   // update the buystore with this id (accessed at PUT http://localhost:8080/api/project/:project_id)
  .put(function(req, res) {
    // use our buystore model to find the buystore we want
    Buystores[req.params.buystore_id].message = req.body.message; // update the project info
    Buystores[req.params.buystore_id].pic = req.body.pic; // update the project info
    Buystores[req.params.buystore_id].share = req.body.share; // update the project info
    res.json({
      message: 'Buystore updated!'
    });
  })

   // delete the buystore with this id (accessed at DELETE http://localhost:8080/api/project/:project_id)
  .delete(function(req, res) {
    delete Buystores[req.params.buystore_id]
    res.json({
      message: 'Buystore deleted!'
    });
  })

// get all the project (accessed at GET http://localhost:8080/api/project)
router.route('/sums')
  .get(function(req, res) {
    // res.json(project.findAll());
    res.json(Sums);
  });
// create a sum (accessed at POST http://localhost:8080/api/project)
router.route('/sums')
  .post(function(req, res) {
    var sum = {};
    sum.id = 0;
    sum.sums = req.body.sums;
    //project.save(bear);
    Sums.push(sum);
    res.json({
      message: 'Sum created!'
    });
  });

  // on routes that end in /project/:project_id
router.route('/sums/:sum_id')
 // get the bear with that id (accessed at GET http://localhost:8080/api/project/:project_id)
  .get(function(req, res) {
    res.json(Sums[req.params.sum_id]);
  })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/project/:project_id)
  .put(function(req, res) {
    // use our bear model to find the bear we want
    Sums[req.params.sum_id].sums = req.body.sums; // update the project info
    res.json({
      message: 'Sums updated!'
    });
  })

  // delete the bear with this id (accessed at DELETE http://localhost:8080/api/project/:project_id)
  .delete(function(req, res) {
    delete Sums[req.params.sum_id]
    res.json({
      message: 'Sums deleted!'
    });
  })


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

//static directory
app.use(express.static('public'))

// use the router and 401 anything falling through
app.use("*", function(req, res) {
  res.status(404).send('404 Not found');
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
