import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
    let baseUrl = url
    if(country) {
        baseUrl = `${url}/countries/${country}`
    }

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(baseUrl)
        return { confirmed, recovered, deaths, lastUpdate }
    } catch(error) {
        throw error
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`)
        return data.map((item) => ({
            confirmed: item.confirmed.total,
            deaths: item.deaths.total,
            date: item.reportDate 
        }))
    } catch(error) {
        throw error
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`)
        return countries.map((country) => country.name)
    } catch(error) {
        throw error
    }
}