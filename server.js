/* Empty JS object to act as endpoint for all routes */
projectData = {};
const addData =[];
/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));

const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
  };

// GET route



app.get('/all', getData);

function getData (request, response) {

  console.log(addData);
  response.send(addData);
};

// POST 

app.post('/addWeather', addWeather);

function addWeather (req,res){
  projectData={
    temp: req.body.temp,
    date:req.body.date,
    feelings:req.body.feelings
  }
    addData.unshift(projectData);
    console.log('newdata', projectData);
    console.log('weather data', addData)
};

