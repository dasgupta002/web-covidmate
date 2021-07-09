import React from 'react'
import { fetchData } from './api/data'
import Cards from './components/card'
import Picker from './components/picker'
import Chart from './components/chart'
import styles from './css/app.module.css'

class App extends React.Component {
  state = {
    data: {},
    country: ''
  }

  async componentDidMount() {
    const cases = await fetchData()
    this.setState({ data: cases })
  }

  handleCountry = async (county) => {
    const localHistory = await fetchData(county)
    this.setState({ data: localHistory, country: county })
  }  
  
  render() {
    return(
      <div className = { styles.container }>
        <img src = './images/corona.jpeg' className = { styles.image } />
        <Cards content = { this.state.data } />
        <Picker handler = { this.handleCountry } />
        <Chart demography = { this.state.data } region = { this.state.country } />
      </div>
    )
  }
}

export default App