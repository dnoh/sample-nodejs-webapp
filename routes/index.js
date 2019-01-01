const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator/check');

const router = express.Router();
const Registration = mongoose.model('Registration');

//Array of task names
var tasksToDo = [
    " do the dishes",
    " sweep the house",
    " do the laundry",
    " take out the recycling",
    " make a sammich",
    " mow the lawn",
    " rake the leaves",
    " give the dog a bath",
    " bake some cookies",
    " wash the car"
];

//2-D Array of allowed tasks based on index
var allowedTasks = [
    [0,1,2,3,4],
    [5,6,7,8,9],
    [0,2,4,6,8],
    [1,3,5,7,9],
    [0,10],
    [4,5]
];

//Array of the type of robots allowed 
var typeCheck = [
  "unipedal",
  "bipedal",
  "quadrupedal",
  "arachnid",
  "radial",
  "aeronautical"
];

//Checks if the type listed is allowed
function typeChecks(type){
    if(typeCheck.includes(type.toLowerCase())) return true;
    else return false;
}

//renders to the home page
router.get('/', (req, res) => {
    res.render('form', { title: 'Registration form' });
});

//post request to gather the data sent in and check for errors in sent in data and if correct pass it 
//into the mongo database which is then used to be queried in descending order for the leader board
//Checks the validity of the input  
router.post('/',
    [
      body('name')
        .not()
        .isEmpty()
        .withMessage('Name is required')
        .custom((value, { req }) => {
            return new Promise((resolve, reject) => {
                Registration.findOne({name:req.body.name}, function(err, user){
                  if(err) {
                    reject(new Error('Server Error'))
                  }
                  if(Boolean(user)) {
                    reject(new Error('Name is already taken'))
                  }
                  resolve(true)
                });
              }); 
        }),
      body('type')
        .custom((value, { req }) => {
            if(!typeChecks(value)){
                throw new Error('Please enter a valid type');
            }
            return true;
        })
    ],
    (req, res) => {
      //Generates the attempted tasks, completed tasks, and the total time spent  
      var tasks = [1000,3000,10000,4000,7000,20000,18000,14500,8000,20000]; 
      var taskList = [];
      var attemptedList = []; 
      var i = 0, time = 0;  
      let typeIndex = typeCheck.indexOf(req.body.type.toLowerCase());
      if(typeIndex != -1){
        for(i = 0; i < 5; i++){
            var check = false;
            while(!check){
                var index = Math.floor((Math.random() * 10));
                if(tasks[index] != 0){
                    time += tasks[index];
                    tasks[index] = 0;
                    if(allowedTasks[typeIndex].includes(index))
                        taskList.push(tasksToDo[index]);
                    else 
                        attemptedList.push(tasksToDo[index]);
                    check = true;     
                }    
            }  
          }
      }  
      //data structure used to pass in the data to the mongodb
      var data = {
        "name": req.body.name,
        "type": req.body.type.toLowerCase(),
        "time": time,
        "tasks": taskList, 
        "attempted": attemptedList,
        "taskList": tasks
      }
      //Checks for errors here in the passed in data, and if there is no problem then
      //the page is redirected to the leaderboards page
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const registration = new Registration(data);
        registration.save()
          .then(() => { res.redirect('/registrations'); })
          .catch(() => { res.send('Sorry! Something went wrong.'); });
      } else {
        res.render('form', {
          title: 'Registration form',
          errors: errors.array(),
          data: req.body,
        });
      }
    }
);

//renders the leaderboard page
router.get('/registrations', (req, res) => {
    Registration.find().sort( { 'time' : -1 } )
      .then((registrations) => {
        res.render('index', { title: 'Leaderboard', registrations });
      })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
  });

module.exports = router;