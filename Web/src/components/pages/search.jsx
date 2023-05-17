import React from 'react';
import TwApi from "../services"
import Twit from "../molecules/twit";
import TwitLog from "../organisms/twitLog";
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [tweets,setTweets] =useState([]);
  const [error,setError]=useState("")

  useEffect(()=>{TwApi.search(searchParams.get("text"))
                      .then(response => setTweets(response.data.results))
                      .catch((error) => setError(error.data.title))
                },[searchParams])

  if (error!="") return <div><h2>Ups... algo salio mal</h2><p>{error}</p></div>

  if (!tweets) return <div className="fw-bold mb-2">loading... </div>

  return (
    <>
    <div className="vh-100 overflow-auto">
      <h1 className="fw-bold mb-4">Resultado de la búsqueda</h1>
      { (tweets.length > 0)?  
        tweets.map((tweet)=><Twit twit={tweet} key={Math.floor(Math.random() * 10000000) + 1}/>):
        <p>No se encontraron esultados.</p>}
      <TwitLog twits={tweets} />
    </div>

    </>
  )
}
export default Search