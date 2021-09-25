/* Global Variables */

let btn__generate = document.getElementById('generate');

/**
 * @description set inputs empty while refreshing && create error msg dialog
 * */
window.addEventListener('load',function(){
    let msg__node = document.createElement("div");
    msg__node.id = "msg__error";
    msg__node.innerHTML="Unidentifed error. Please reload.";
 
    document.getElementById("app").appendChild(msg__node);
    document.getElementById('zip').value ="";
    document.getElementById('feelings').value="";

    setButton__generate();
    document.getElementById('msg__error').addEventListener("click", () => {
        document.getElementById('msg__error').style.display='none';
 
     });

});

/**
 * @description click event for generate button to fetch the api data
 * */
function setButton__generate(){
    document.getElementById('generate').addEventListener("click", () => {

      const inputZIP = document.getElementById('zip').value;
      const  txtarea__feeling = document.getElementById('feelings').value;
  //check zip code value
    if(inputZIP == ""  ){
        document.getElementById('msg__error').style.display='block';
        document.getElementById('msg__error').innerHTML="ZIP code can not be empty. Please add your ZIP code.";
    }
    //check feelings dialog value
    else if(txtarea__feeling == "" ){
        document.getElementById('msg__error').style.display='block';
        document.getElementById('msg__error').innerHTML=" Please add your feelings first.";
    }
    //set the weather data 
    else{
       performAction(inputZIP,txtarea__feeling);
    }

    });
    
}

// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=2ae7e6880e41afe51e609dc19b17d0e0';

// Create a new date instance dynamically with JS
let datenow = new Date();
let newDate = datenow.getMonth() + 1 + '.' + datenow.getDate() + '.' + datenow.getFullYear();
 
/**
 * @description get the api data , post data to the server
 * */
function performAction(zip,feelings){
 
getWeather (baseURL , zip, apiKey)
.then((data) =>{
  postData('/addWeather',{temp:data.main.temp,date:newDate,feelings:feelings})
})
.then(() =>{
updateUI()
});

;

}
/**
 * @description fetch the api url json data 
 * */
const getWeather = async (baseURL, zipcode, key)=>{

  const res = await fetch (baseURL + zipcode + key)
  try {
    const data = await res.json();
    if(data.cod == '404')
    {
        document.getElementById('msg__error').style.display='block';
        document.getElementById('msg__error').innerHTML=`Invalid zip code value. Please resubmit.`;
        document.getElementById('zip').value ="";
        document.getElementById('feelings').value="";
        document.getElementById('temp').innerHTML = "";
        document.getElementById('date').innerHTML = "";
       document.getElementById('content').innerHTML = "";
    }
    console.log( 'api data' , data);
    return data;
  }  catch(error) {
    console.log('error',error);
  }
}
/**
 * @description Async post the data to the server function 
 * */

const postData = async ( url = '', data = {})=>{

  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),       
});

  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
  console.log("error", error);
  }
};

// Async GET
const retrieveData = async (url='') =>{ 
const request = await fetch(url);
try {
// Transform into JSON
const allData = await request.json()
}
catch(error) {
  console.log("error", error);
  
}
};

// Chain  async functions to post  data then GET the resulting data
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    //const length = allData.length;
    console.log('length', allData);
    document.getElementById('temp').innerHTML =    `The temprature is:    <strong> ${allData[0].temp}° </strong>  ` ;
    document.getElementById('date').innerHTML =    `The current date is:  <strong> ${allData[0].date}   </strong>  `   ;
    document.getElementById('content').innerHTML = `Your feelings are :   <strong> ${allData[0].feelings} </strong>  ` ;

  }catch(error){
    console.log("error", error);
  }
}


/*
handling errors:
1. in case of wrong zip === 404 error 
2. in case of empty zip code or feelings text area

but the server still add the same zip data to the server every time  I add it //should we fix that??



*/
