/* Global Variables */
 //input variables
let inputZIP = document.getElementById('zip');
let txtarea__feeling = document.getElementById('feelings');
let btn__generate = document.getElementById('generate');
 //output variables
let div__temp = document.getElementById('temp');
let div__date = document.getElementById('date');
let div__content = document.getElementById('content');


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

   
  //check zip code value
    if(inputZIP.value == ""  ){
        document.getElementById('msg__error').style.display='block';
        document.getElementById('msg__error').innerHTML="ZIP code can not be empty. Please add your ZIP code.";
    }
    //check feelings dialog value
    else if(txtarea__feeling.value == "" ){
        document.getElementById('msg__error').style.display='block';
        document.getElementById('msg__error').innerHTML=" Please add your feelings first.";
    }
    //set the weather data 
    else{
       performAction();
    }

    });
    
}

// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=2ae7e6880e41afe51e609dc19b17d0e0';

// Create a new date instance dynamically with JS
let datenow = new Date();
let newDate = datenow.getMonth() + '.' + datenow.getDate() + '.' + datenow.getFullYear();
 
/**
 * @description get the api key 
 * */
function performAction(e){
getWeather (baseURL , inputZIP.value , apiKey);

}
/**
 * @description fetch the api url json data , update the UI 
 * */
const getWeather = async (baseURL, zipcode, key)=>{

  const res = await fetch (baseURL + zipcode + key)
  try {
    const data = await res.json();
    console.log(data);
    if(data.cod == '404')
    {
        document.getElementById('msg__error').style.display='block';
        document.getElementById('msg__error').innerHTML=`Invalid zip code value. Please resubmit.`;
    }
    else{
      div__temp.innerHTML=`<strong> The current temprature: </strong>${data.main.temp}°`;
      div__date.innerHTML=`<strong> The current date: </strong>${newDate}`;
      div__content.innerHTML=`<strong> Your are feeling: </strong>${txtarea__feeling.value}`;
    }
    return data;
  }  catch(error) {
     
   document.getElementById('msg__error').style.display='block';
   document.getElementById('msg__error').innerHTML=`${error.value}. Please resubmit.`;
  }
}



