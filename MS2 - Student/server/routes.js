const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

async function borough_summary(req, res) {

    const year = req.query.year ? req.query.year : 2020
    
    connection.query(`
    WITH Borough_Rents AS (
    SELECT NeighborhoodBorough.Borough, AVG(Rent.AvgRent) AS Average_Rent
    FROM NeighborhoodBorough JOIN Rent ON NeighborhoodBorough.Neighborhood = Rent.Neighborhood
    WHERE Rent.Year = ${year}
    GROUP BY NeighborhoodBorough.Borough
    ),
    Borough_Crimes AS (
    SELECT NeighborhoodBorough.Borough, COUNT(*) AS Crime_Count
    FROM NeighborhoodBorough JOIN ZipCodeNeighborhood ON NeighborhoodBorough.Neighborhood = ZipCodeNeighborhood.Neighborhood JOIN Crime ON Crime.ZipCode = ZipCodeNeighborhood.ZipCode
    WHERE Crime.Year = ${year}
    GROUP BY NeighborhoodBorough.Borough
    )
    SELECT Borough_Crimes.Borough, Borough_Rents.Average_Rent, Borough_Crimes.Crime_Count
    FROM Borough_Crimes LEFT OUTER JOIN Borough_Rents ON Borough_Crimes.Borough = Borough_Rents.Borough
    ORDER BY Borough_Rents.Borough;
    `, function (error, results, fields) {
    
        if (error) {
            console.log(error)
            res.json({ error: error })
        }

        else if (results) {
            res.json({ results: results })
        }

    });

}





// async function jersey(req, res) {
//     const colors = ['red', 'blue']
//     const jersey_number = Math.floor(Math.random() * 20) + 1
//     const name = req.query.name ? req.query.name : "player"

//     if (req.params.choice === 'number') {
//         // TODO: TASK 1: inspect for issues and correct 
//         res.json({ message: `Hello, ${name}!`, jersey_number: jersey_number })
//     } else if (req.params.choice === 'color') {
//         var lucky_color_index = Math.floor(Math.random() * 2);
//         // TODO: TASK 2: change this or any variables above to return only 'red' or 'blue' at random (go Quakers!)
//         res.json({ message: `Hello, ${name}!`, jersey_color: colors[lucky_color_index] })
//     } else {
//         // TODO: TASK 3: inspect for issues and correct
//         res.json({ message: `Hello, ${name}, we like your jersey!` })
//     }
// }

// // ********************************************
// //               GENERAL ROUTES
// // ********************************************


// // Route 3 (handler)
// async function all_matches(req, res) {
//     // TODO: TASK 4: implement and test, potentially writing your own (ungraded) tests
//     // We have partially implemented this function for you to 
//     // parse in the league encoding - this is how you would use the ternary operator to set a variable to a default value
//     // we didn't specify this default value for league, and you could change it if you want! 
//     // in reality, league will never be undefined since URLs will need to match matches/:league for the request to be routed here... 
//     const league = req.params.league ? req.params.league : 'D1'
//     const page = req.query.page
//     const pagesize = req.query.pagesize ? req.query.pagesize : 10
//     // use this league encoding in your query to furnish the correct results

//     if (req.query.page && !isNaN(req.query.page)) {
//         // This is the case where page is defined.
//         // The SQL schema has the attribute OverallRating, but modify it to match spec! 
//         // TODO: query and return results here:
    
//         const startindex = (page-1)*pagesize

//         connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
//         FROM Matches 
//         WHERE Division = '${league}'
//         ORDER BY HomeTeam, AwayTeam
//         LIMIT ${startindex},${pagesize}`, function (error, results, fields) {

//             if (error) {
//                 console.log(error)
//                 res.json({ error: error })
//             } else if (results) {
//                 res.json({ results: results })
//             }
//         });

   
//     } else {
//         // we have implemented this for you to see how to return results by querying the database
//         connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
//         FROM Matches 
//         WHERE Division = '${league}'
//         ORDER BY HomeTeam, AwayTeam`, function (error, results, fields) {

//             if (error) {
//                 console.log(error)
//                 res.json({ error: error })
//             } else if (results) {
//                 res.json({ results: results })
//             }
//         });
//     }
// }

// // Route 4 (handler)
// async function all_players(req, res) {
//     // TODO: TASK 5: implement and test, potentially writing your own (ungraded) tests
    
//     const page = req.query.page
//     const pagesize = req.query.pagesize ? req.query.pagesize : 10

//     if (req.query.page && !isNaN(req.query.page)) {

//         const startindex = (page-1)*pagesize

//         connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value  
//             FROM Players 
//             ORDER BY Name
//             LIMIT ${startindex},${pagesize}`, function (error, results, fields) {
    
//                 if (error) {
//                     console.log(error)
//                     res.json({ error: error })
//                 } else if (results) {
//                     res.json({ results: results })
//                 }
//             });
        
//     } else {

//         connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value  
//             FROM Players 
//             ORDER BY Name`, function (error, results, fields) {
    
//                 if (error) {
//                     console.log(error)
//                     res.json({ error: error })
//                 } else if (results) {
//                     res.json({ results: results })
//                 }
//             });

//     }

// }


// // ********************************************
// //             MATCH-SPECIFIC ROUTES
// // ********************************************

// // Route 5 (handler)
// async function match(req, res) {
//     // TODO: TASK 6: implement and test, potentially writing your own (ungraded) tests
    
//     const id = req.query.id

//     if (req.query.id && !isNaN(req.query.id)) {

//         connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals,
//             HalfTimeGoalsH AS HTHomeGoals, HalfTimeGoalsA AS HTAwayGoals, ShotsH AS ShotsHome, ShotsA AS ShotsAway, ShotsOnTargetH AS ShotsOnTargetHome,
//             ShotsOnTargetA AS ShotsOnTargetAway, FoulsH AS FoulsHome, FoulsA AS FoulsAway, CornersH AS CornersHome, CornersA AS CornersAway,
//             YellowCardsH AS YCHome, YellowCardsA AS YCAway, RedCardsH AS RCHome, RedCardsA AS RCAway
//             FROM Matches 
//             WHERE MatchId = ${id}`, function (error, results, fields) {
    
//                 if (error) {
//                     console.log(error)
//                     res.json({ error: error })
//                 } else if (results) {
//                     res.json({ results: results })
//                 }
//             });

//     } else {

//         return res.json({error: "Invalid id"})

//     }

// }

// // ********************************************
// //            PLAYER-SPECIFIC ROUTES
// // ********************************************

// // Route 6 (handler)
// async function player(req, res) {
//     // TODO: TASK 7: implement and test, potentially writing your own (ungraded) tests
    
//     const id = req.query.id

//     if (req.query.id && !isNaN(req.query.id)) {

//         connection.query(`SELECT BestPosition 
//         FROM Players
//         WHERE PlayerId = ${id}`, function (error, results, fields) {

//             if (error) {

//                 console.log(error)
//                 res.json({ error: error })

//             }
                    
//             else {

//                 if (results == '') {

//                     return res.json({results: [] })
    
//                 }

//                 if (results[0]['BestPosition'] === 'GK') {

//                     connection.query(`SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating as Rating, Potential, Club, ClubLogo, Value,
//                     Wage, InternationalReputation, Skill, JerseyNumber, ContractValidUntil, Height, Weight, BestPosition,
//                     BestOverallRating, ReleaseClause, GKPenalties, GKDiving, GKHandling, GKKicking, GKPositioning, GKReflexes
//                     FROM Players
//                     WHERE PlayerId = ${id}`, function (error, gkresults, fields) {

//                         res.json({results: gkresults})

//                     });

//                 }

//                 else {

//                     connection.query(`SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating as Rating, Potential, Club, ClubLogo, Value,
//                     Wage, InternationalReputation, Skill, JerseyNumber, ContractValidUntil, Height, Weight, BestPosition, 
//                     BestOverallRating, ReleaseClause, NPassing, NBallControl, NAdjustedAgility, NStamina, NStrength, NPositioning
//                     FROM Players
//                     WHERE PlayerId = ${id}`, function (error, othresults, fields) {

//                         res.json({results: othresults})

//                     });

//                 }
//             }

//         });

//     }

//     else {

//         return res.json({error: "Invalid id"})

//     }

// }

// // ********************************************
// //             SEARCH ROUTES
// // ********************************************

// // Route 7 (handler)
// async function search_matches(req, res) {
//     // TODO: TASK 8: implement and test, potentially writing your own (ungraded) tests
//     // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string

//     const hteam = req.query.Home ? req.query.Home : '%'
//     const ateam = req.query.Away ? req.query.Away : '%'

//     const page = req.query.page
//     const pagesize = req.query.pagesize ? req.query.pagesize : 10

//     if (req.query.page && !isNaN(req.query.page)) {

//         const startindex = (page-1)*pagesize

//         connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
//         FROM Matches
//         WHERE HomeTeam LIKE '%${hteam}%' AND AwayTeam LIKE '%${ateam}%'
//         ORDER BY HomeTeam, AwayTeam
//         LIMIT ${startindex},${pagesize}`, function (error, results, fields) {
    
//             if (error) {

//                 console.log(error)
//                 res.json({ error: error })

//             } 
                
//             else if (results) {

//                 res.json({ results: results })

//             }
            
//         });
        
//     } 
    
//     else {

//         connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
//         FROM Matches
//         WHERE HomeTeam LIKE '%${hteam}%' AND AwayTeam LIKE '%${ateam}%'
//         ORDER BY HomeTeam, AwayTeam`, function (error, results, fields) {
    
//             if (error) {

//                 console.log(error)
//                 res.json({ error: error })

//             } 
                
//             else if (results) {

//                 res.json({ results: results })

//             }
            
//         });

//     }

// }

// // Route 8 (handler)
// async function search_players(req, res) {
//     // TODO: TASK 9: implement and test, potentially writing your own (ungraded) tests
//     // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
    
//     const name = req.query.Name ? req.query.Name : '%'
//     const nation = req.query.Nationality ? req.query.Nationality : '%'
//     const club = req.query.Club ? req.query.Club : '%'
//     const lrating = req.query.RatingLow ? req.query.RatingLow : 0
//     const hrating = req.query.RatingHigh ? req.query.RatingHigh : 100
//     const lpotent = req.query.PotentialLow ? req.query.PotentialLow : 0
//     const hpotent = req.query.PotentialHigh ? req.query.PotentialHigh : 100

//     const page = req.query.page
//     const pagesize = req.query.pagesize ? req.query.pagesize : 10

//     if (req.query.page && !isNaN(req.query.page)) {

//         const startindex = (page-1)*pagesize

//         connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
//         FROM Players
//         WHERE Name LIKE '%${name}%' AND Nationality LIKE '%${nation}%' AND Club LIKE '%${club}%'
//         AND OverallRating >= ${lrating} AND OverallRating <= ${hrating} 
//         AND Potential >= ${lpotent} AND Potential <= ${hpotent}
//         ORDER BY Name
//         LIMIT ${startindex},${pagesize}`, function (error, results, fields) {
    
//             if (error) {

//                 console.log(error)
//                 res.json({ error: error })

//             } 
                
//             else if (results) {

//                 res.json({ results: results })

//             }
            
//         });
        
//     } 
    
//     else {

//         connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
//         FROM Players
//         WHERE Name LIKE '%${name}%' AND Nationality LIKE '%${nation}%' AND Club LIKE '%${club}%'
//         AND OverallRating >= ${lrating} AND OverallRating <= ${hrating} 
//         AND Potential >= ${lpotent} AND Potential <= ${hpotent}
//         ORDER BY Name`, function (error, results, fields) {
    
//             if (error) {

//                 console.log(error)
//                 res.json({ error: error })

//             } 
                
//             else if (results) {

//                 res.json({ results: results })

//             }
            
//         });

//     }

// }

module.exports = {
    borough_summary
    // jersey,
    // all_matches,
    // all_players,
    // match,
    // player,
    // search_matches,
    // search_players
}