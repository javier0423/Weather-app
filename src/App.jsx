import { useEffect, useState } from 'react'
import './App.css'
import { Icons } from './components/Icons'

export function App() {

  const [search, setSearch] = useState('')
  const [values, setValues] = useState('')
  const [icon, setIcon] = useState('')

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=es&units=metric&appid=286d36986eb5ae6122fc36d33da9a183
  `
  // const URl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`

  const getData = async () => {
    await fetch(URL)
      .then(response => {return response.json()})
      .then(data => {
        if (data.cod >= 400) {
          setValues(false)
        }else {
          console.log(data);
          console.log(data.weather[0].main)
          setIcon(data.weather[0].main)
          setValues(data)
        }
        // console.log(data.main);
      })
      .catch(
        error => console.log(error)
      )
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value)
      console.log(e.target.value);
    }
  }

  useEffect(()=>{
    getData()
  },[search])

  return (
    <>
      <div className='container'>
  <h2>React Weather-App</h2>
  <div className='row'>
    <input
      onKeyDown={handleSearch}
      type='text'
      autoFocus
    />
  </div>
</div>

<div className='card'>
  {values ? (
    <div className='card-container'>
      <h1 className='city-name'>{values.name}</h1>
      <div className='temp-wind-container'>
        <p className='temp'>{values.main.temp.toFixed(0)}&deg;</p>
      </div>
      <img className='icon' src={Icons(values.weather[0].main)} alt='icon-weather' />
      <div className='card-footer'>
        <p className='temp-max-min'>
          {values.main.temp_min.toFixed(0)}&deg; | {values.main.temp_max.toFixed(0)}&deg;
          <p className='wind-info'>Viento: {values.wind.speed} m/s</p>
          <p className='humidity-info'>Humedad: {values.main.humidity}%</p> {/* Párrafo de humedad */}
        </p>
      </div>
    </div>
  ) : (
    <h1>{'City not found'}</h1>
  )}
</div>


    </>
  )
}
