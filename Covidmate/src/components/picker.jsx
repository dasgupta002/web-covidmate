import React, { useEffect, useState } from 'react'
import { fetchCountries } from '../api/data'
import { NativeSelect, FormControl } from '@material-ui/core'
import styles from '../css/picker.module.css'

const Picker = ({ handler }) => {
    const [countryList, setCountryList] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            setCountryList(await fetchCountries())
        }   
        fetchAPI()     
    }, [setCountryList])

    return(
        <FormControl className = { styles.form }>
           <NativeSelect defaultValue = "" onChange = { (event) => { handler(event.target.value) } }>
              <option value = "">Global</option>
              { countryList.map((country) => <option value = { country }>{ country }</option>) }
           </NativeSelect>
        </FormControl>
    )
}

export default Picker