const express = require('express');
const mysql = require('mysql');


const routes = require('./routes')
const config = require('./config.json')
const cors = require('cors');


const app = express();
app.use(cors({
    origin: '*'
}));

app.get('/borough/summary', routes.borough_summary)

app.get('/borough/trends', routes.borough_trends)

app.get('/filter/rents', routes.rent_filter)

app.get('/filter/crimes', routes.crime_filter)

app.get('/search', routes.search_neighborhood)

app.get('/neighborhood', routes.neighborhood)

app.get('/neighborhood/rank', routes.neighborhood_rank)

app.get('/city/rents', routes.city_rents)

app.get('/city/crimelevel', routes.city_crime_level)

app.get('/city/crimeage', routes.city_crime_age)


var port = process.env.PORT || 8080;

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${port}/`);
});

module.exports = app;