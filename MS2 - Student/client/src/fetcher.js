import config from './config.json'

const getBoroughSummary = async (year, usefor) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/home?year=${year}&usefor=${usefor}`, {
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

const getFilteredCrimeOffense = async (level, numresults, ordering) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/filter/crimes/offenselevel?level=${level}&numresults=${numresults}&ordering=${ordering}`, {
        method: 'GET',
    })
    return res.json()
}

const getFilteredCrimeGender = async (gender, numresults, ordering) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/filter/crimes/gender?gender=${gender}&numresults=${numresults}&ordering=${ordering}`, {
        method: 'GET',
    })
    return res.json()
}

const getFilteredCrimeAge = async (age_limit, age_range) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/filter/crimes/age?age_limit=${age_limit}&age_range=${age_range}`, {
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
    getFilteredCrimeOffense,
    getFilteredCrimeGender,
    getFilteredCrimeAge
    // getAllMatches,
    // getAllPlayers,
    // getMatch,
    // getPlayer,
    // getMatchSearch,
    // getPlayerSearch
}