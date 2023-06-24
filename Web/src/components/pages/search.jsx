import React from 'react';
import TwApi from "../services"
import TweetLog from "../organisms/tweetLog";
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [params] = useSearchParams();
  const [tweets,setTweets] = useState([]);
  const [error,setError] = useState('');

  useEffect(()=>{TwApi.search(params.getAll('text'))
                      .then(response => {
                          setTweets(response.data.results);
                          setError('');
                        })
                      .catch((error) => setError(error.description))
                },[params])

  if (error) return <div><h2>Ups... algo salió mal</h2><p className="etiquetaRoja">{error}</p></div>

  if (!tweets) return <div className="fw-bold mb-2">Loading... </div>

  return (
    <div className="vh-100 overflow-hidden">
      <div>
        <h1 className="fw-bold mb-4 p-4">Resultados de la búsqueda</h1>
        <h3 className='p-4'>Resultados para: "<strong>{params.getAll('text')}</strong>"</h3>
      </div>
      <div className="vh-100 overflow-auto">
        { (tweets.length > 0)?<TweetLog tweets={tweets} />:<p>No se encontraron resultados.</p>}
      </div>
    </div>
  )
}
export default Search

