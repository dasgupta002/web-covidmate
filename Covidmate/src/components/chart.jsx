import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { fetchDailyData } from '../api/data'
import styles from '../css/chart.module.css'

const Chart = ({ demography, region }) => {
    const [graph, setGraph] = useState([]) 
    
    useEffect(() => {
        const fetchAPI = async () => {
            setGraph(await fetchDailyData())
        }
        fetchAPI()
    }, [])

    const lineChart = () => (
        graph.length !== 0 ? (<Line data = {{ 
                                       labels: graph.map(({ date }) => date), 
                                       datasets: [{
                                          data: graph.map(({ confirmed }) => confirmed),
                                          label: 'Infected',
                                          borderColor: '#3333ff',
                                          fill: true
                                        }, {
                                          data: graph.map(({ deaths }) => deaths),
                                          label: 'Deaths',
                                          borderColor: 'red',
                                          backgroundColor: 'rgba(255, 0, 0, 0.5)',
                                          fill: true
                                       }] 
                                    }} 
                              />) : null 
    )

    const barChart = () => (
        demography.confirmed ? (<Bar data = {{
                                   labels: ['Infected', 'Recovered', 'Deaths'],
                                   datasets: [{
                                       label: 'People',
                                       backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                                       data: [demography.confirmed.value, demography.recovered.value, demography.deaths.value]
                                   }]
                               }}
                               options = {{
                                   legend: { display: false },
                                   title: { display: true, text: `Current status of ${region}` }
                               }}
                          />) : null
    )

    return(
        <div className = { styles.container }>
           { region ? barChart() : lineChart() }
        </div>
    )
}

export default Chart