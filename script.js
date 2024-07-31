const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Serve your HTML file
});

app.post('/', (req, res) => {
    const nameofCity = req.body.cityName;
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + nameofCity + '&appid=091407001ef812a094e745e66dde647b&units=metric';

    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on('data', (data) => {
            const weatherInfo = JSON.parse(data);
            const temperature = weatherInfo.main.temp;
            const weatherDescription = weatherInfo.weather[0].description;
            const feelsLike = weatherInfo.main.feels_like;
            const icon = weatherInfo.weather[0].icon;

            const htmlResponse = `
                <h1>The current temperature in ${nameofCity} is ${temperature} degree Celsius</h1>
                <h2>The weather condition is: ${weatherDescription}</h2>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
                <h2>It feels like ${feelsLike} degree Celsius here in ${nameofCity}</h2>
                <h2>Visibility is: ${weatherInfo.visibility}</h2>
                <h2>The humidity is: ${weatherInfo.main.humidity}%</h2>
                <h2>The wind speed is: ${weatherInfo.wind.speed} KM/H</h2>
            `;

            res.setHeader('Content-Type', 'text/html');
            res.send(htmlResponse);
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});