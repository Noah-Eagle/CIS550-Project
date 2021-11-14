const express = require('express');
const mysql = require('mysql');


const routes = require('./routes')
const config = require('./config.json')
const cors = require('cors');


const app = express();
app.use(cors({
    origin: '*'
}));



app.get('/home', routes.borough_summary)

// // Route 4 - register as GET 
// app.get('/players', routes.all_players)

// // Route 7 - register as GET 
// app.get('/search/matches', routes.search_matches)

// // Route 8 - register as GET 
// app.get('/search/players', routes.search_players)





app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;