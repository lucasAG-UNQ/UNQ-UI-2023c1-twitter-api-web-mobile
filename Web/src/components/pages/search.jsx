import React from 'react';
import TwApi from "../services"
import TwitLog from "../organisms/twitLog";
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [params] = useSearchParams();
  const [twitts,setTwitts] = useState([]);
  const [error,setError] = useState('');

  console.log("params: --->>>", params.getAll('text'));

  useEffect(()=>{TwApi.search(params.getAll('text'))
                      .then(response => {
                          setTwitts(response.data.results);
                          setError('');
                        })
                      .catch((error) => setError(error.description))
                },[params])

  if (error) return <div><h2>Ups... algo salió mal</h2><p className="etiquetaRoja">{error}</p></div>

  if (!twitts) return <div className="fw-bold mb-2">Loading... </div>

  return (
    <div className="vh-100 overflow-hidden">
      <div>
        <h1 className="fw-bold mb-4 p-4">Resultados de la búsqueda</h1>
        <h3 className='p-4'>Resultados para: "<strong>{params.getAll('text')}</strong>"</h3>
      </div>
      <div className="vh-100 overflow-auto">
        { (twitts.length > 0)?<TwitLog twits={twitts} />:<p>No se encontraron resultados.</p>}
      </div>
    </div>
  )
}
export default Search

