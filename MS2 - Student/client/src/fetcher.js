import config from './config.json'

const getBoroughSummary = async (year) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/home?year=${year}`, {
        method: 'GET',
    })
    return res.json()
}

const getBoroughTrends = async (borough) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/borough-trends?borough=${borough}`, {
        method: 'GET',
    })
    return res.json()
}

const getFilteredRents = async (minrent, maxrent) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/filter/rents?minrent=${minrent}&maxrent=${maxrent}`, {
        method: 'GET',
    })
    return res.json()
}

const getFilteredCrime = async (felony_limit, gender_limit, age_limit, gender, age_range) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/filter/crimes?felony_limit=${felony_limit}&gender_limit=${gender_limit}&age_limit=${age_limit}&gender=${gender}&age_range=${age_range}`, {
        method: 'GET',
    })
    return res.json()
}

// const getAllMatches = async (page, pagesize, league) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`, {
//         method: 'GET',
//     })
//     return res.json()
// }

// const getAllPlayers = async (page, pagesize) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/players?page=${page}&pagesize=${pagesize}`, {
//         method: 'GET',
//     })
//     return res.json()
// }

// const getMatch = async (id) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
//         method: 'GET',
//     })
//     return res.json()
// }

// const getPlayer = async (id) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/player?id=${id}`, {
//         method: 'GET',
//     })
//     return res.json()
// }

// const getMatchSearch = async (home, away, page, pagesize) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
//         method: 'GET',
//     })
//     return res.json()
// }

// const getPlayerSearch = async (name, nationality, club, rating_high, rating_low, pot_high, pot_low, page, pagesize) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/search/players?Name=${name}&Nationality=${nationality}&Club=${club}&RatingLow=${rating_low}&RatingHigh=${rating_high}&PotentialHigh=${pot_high}&PotentialLow=${pot_low}&page=${page}&pagesize=${pagesize}`, {
//         method: 'GET',
//     })
//     return res.json()
// }




export {
    getBoroughSummary,
    getBoroughTrends,
    getFilteredRents,
    getFilteredCrime
    // getAllMatches,
    // getAllPlayers,
    // getMatch,
    // getPlayer,
    // getMatchSearch,
    // getPlayerSearch
}