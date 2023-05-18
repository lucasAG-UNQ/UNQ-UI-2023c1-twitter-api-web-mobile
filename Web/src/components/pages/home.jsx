import React, { useState,useEffect } from "react";
import TwitPost from "../molecules/twitPost";
import TwApi from "../services";
import TwitLog from "../organisms/twitLog";

const Home = () => {


  const [followingTwitts,setFollowingTwitts] = useState([]);
  const [error,setError] = useState('')

  useEffect(()=>{TwApi.getFollowingTwitts()
                      .then(response => setFollowingTwitts(response.data.results))
                      .catch(err=>{
                          //console.log(err.description)
                          setError(err.description)
                      })}, [])

  if (error) return (
    <>
      <h2>Ups... algo salió mal</h2>
      <p className="etiquetaRoja">{error}</p></>
    )

  if (!followingTwitts) return <div>Loading... </div>

  return (
    <>
    <div className="vh-100 overflow-auto ">
      <TwitPost />
      <TwitLog twits={followingTwitts} />
    </div>
    </>
  )
}

export default Home