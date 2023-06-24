import React, { useState,useEffect } from "react";
import TweetPost from "../molecules/tweetPost";
import TwApi from "../services";
import TweetLog from "../organisms/tweetLog";

const Home = () => {


  const [followingTweets,setFollowingTweets] = useState([]);
  const [error,setError] = useState('')

  useEffect(()=>{TwApi.getFollowingTweets()
                      .then(response => {
                        setFollowingTweets(response.data.results);
                        setError('');
                      })
                      .catch(err=>{
                          setError(err.description)
                      })}, [])

  if (error) return (
    <>
      <h2>Ups... algo salió mal</h2>
      <p className="etiquetaRoja">{error}</p></>
    )

  if (!followingTweets) return <div>Loading... </div>

  return (
    <>
    <div className="vh-100 overflow-hidden">
      <div>
        <TweetPost />
      </div>
      <div className="vh-100 overflow-auto">
        <TweetLog tweets={followingTweets} />
      </div>
    </div>
    </>
  )
}

export default Home