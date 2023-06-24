import React from 'react';
import TwApi from "../services"
import TweetLog from "../organisms/tweetLog";
import { useState, useEffect } from "react";

const Trending = () => {
  const [tweets,setTweets] = useState([]);
  const [error,setError] = useState('');

  useEffect(()=>{TwApi.trendingTopics()
                      .then(response => {
                        setTweets(response.data.results);
                        setError('');
                      })
                      .catch((error) => setError(error.description))
                },[])

  if (error) return <div><h2>Ups... algo salió mal</h2><p className="etiquetaRoja">{error}</p></div>

  if (!tweets) return <div className="fw-bold mb-2">Loading... </div>

  return (
    <div className="vh-100 overflow-hidden">
      <div>
        <h1 className="fw-bold mb-4 p-4">Trending Topics</h1>
      </div>
      <div className="vh-100 overflow-auto">
        { (tweets.length > 0)?<TweetLog tweets={tweets} />:<p>No se encontraron Tweets de tendencia.</p>}
      </div>
    </div>
  )
}

export default Trending

    