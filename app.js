const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})
app.post("/", function(req,res){
    const query = req.body.cityName;
    const apiKey = "f17ac4078d2b7f96c7d3976cdefababc";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" +apiKey +"&units="+ unit;
    https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
     const weatherData=JSON.parse(data);
     const temp = weatherData.main.temp;
     const weatherDescription = weatherData.weather[0].description;
     const Icon = weatherData.weather[0].icon;
     const imageUrl="http://openweathermap.org/img/wn/" + Icon +"@2x.png"
     res.write("<h1>the temperature in " + query +" is "+ temp +" degree celcius</h1>");
     res.write("<h3>the current weather is like "+ weatherDescription + "</h3>");
     res.write("<img src=" + imageUrl+  ">");
     res.send();
    })
    })
});

app.listen(3000,function(params){
  console.log("server running on port 3000");
})

