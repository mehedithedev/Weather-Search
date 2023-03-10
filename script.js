const express= require('express')
const bodyParser= require('body-parser')
const https = require('https');
const nodemon= require('nodemon');
// const { resolve } = require('path');

const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))



// Sends JS Script to the HTML file. 
app.get('/', (req,res)=>{
    res.sendFile(__dirname+ "/index.html")   
})


// Post from the HTML
app.post('/', (req,res)=>{
    console.log('The server request is been accepted') 
    const nameofCity= req.body.cityName   
    // console.log(userCity)
// Here is the code to retrive weather information from the OpenWeather API: 
// Fetching data from Open Weather API: 
    // Sorting up variables for particular city names: 
    const url='https://api.openweathermap.org/data/2.5/weather?q='+nameofCity+'&appid=091407001ef812a094e745e66dde647b&units=metric'
    https.get(url, (response)=>{
        console.log(response.statusCode)
        response.on('data', (data)=>{
            // Fetch data from Open Weather Api:
            const weatherInfo=JSON.parse(data)
            const temperature= weatherInfo.main.temp
            const weatherDescription=weatherInfo.weather[0].description
            const feelsLike= weatherInfo.main.feels_like
            const icon= weatherInfo.weather[0].icon
            const iconURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            const humidity=weatherInfo.main.humidity
            const windSpeed=weatherInfo.wind.speed
            const visibility=weatherInfo.visibility
            


            // Outputs the data into the web app
            res.write('<h1> The current temperature in '+nameofCity +' is '+ temperature +' degree celsius</h1>')
            res.write('<h2> The weather condition is: '+ weatherDescription +'</h2>')
            res.write('<img src='+iconURL+'>')
            res.write(`<h2>It feels like ${feelsLike} degree cesius here in ${nameofCity}</h2>`)
            res.write(`<h2>Visibilit is: ${visibility}</h2>`)
            res.write(`<h2>The humidity is: ${humidity}%</h2>`)
            res.write(`<h2>The wind speed is: ${windSpeed} KM/H</h2>`)

        })
    
        

    })







})


// Listens to heroku port as well as localhosr:3000

const port= process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`The port is been started on : ${port}`)
})
