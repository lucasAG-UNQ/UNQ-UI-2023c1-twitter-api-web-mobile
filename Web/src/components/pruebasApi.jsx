import React, { useState, useEffect} from 'react';
import TwApi from './services'

const PruebasApi = () => {

  const [user, setUser] = useState({})
  const [trending, setTrending] = useState([])

  useEffect(() => {
    TwApi.login({ username: 'a', password: 'a'})
      .then( (response) => { 
        setUser(response.data)
        localStorage.setItem('twitterAcessToken', response.headers.authorization);
      })
      .catch( (error) => console.log('error: ', error))
  }, [])
  
  useEffect( () => {
    TwApi.trendingTopics()
      .then( (response) => console.log('trending: ', response.data.results))
      .catch( (error) => console.log('error: ', error))
  }, [])

  return (
    <h1>PruebasApi</h1>


  )
}

export default PruebasApi