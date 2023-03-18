const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app= express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    
    res.sendFile(__dirname +"/index.html");
});

app.post("/", function(req, res){
    
 
    const query = req.body.cityName; 
    const appid = "2dfd9111bd169d209bd5c93ab9aad26f";
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid="+ appid +"&units="+ units +"";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
           const weatherData = JSON.parse(data);
           console.log(weatherData);
           const temp = weatherData.main.temp;
           const description = weatherData.weather[0].description;
           const icon = weatherData.weather[0].icon;
           const imageURL = " https://openweathermap.org/img/wn/"+ icon +"@2x.png"
           res.write("<p>the weather is currently " +description+"</p>");
           res.write("<h1>the temprature in "+ query +" is " +temp+ "</h1>");
           res.write("<img src=" +imageURL+ ">");
           res.send();
        });
    });
});
app.listen(3000, function(){
    console.log("Server is running on port 3000");
});