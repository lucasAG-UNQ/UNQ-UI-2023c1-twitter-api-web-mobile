import Twit from "../molecules/twit";
import TwitPost from "../molecules/twitPost";
import TwApi from "../services";
import "./home.css"
import { useState,useEffect } from "react";

const Home = () => {
  const [followingTweets,setFollowingTweets] =useState();
  const [loggedUser,setLoggedUser]=useState()
  const [error,setError]=useState(false)

  useEffect(()=>{TwApi.getFollowingTweets()
                      .then(data=>setFollowingTweets(data))
                      .catch(err=>{
                          console.log(err)
                          if(err.status === 404)
                            setError=true
                      })
                 TwApi.getUser("u_1").then(data=>setLoggedUser(data))},[])

  if (error) return <div>error</div>

  if (!followingTweets) return <div>loading... </div>

  return (
    <>
      <TwitPost {...loggedUser} />
      {followingTweets.results.map((tweet,index)=><Twit twit={tweet} />)}
    </>
  )
}

export default Home