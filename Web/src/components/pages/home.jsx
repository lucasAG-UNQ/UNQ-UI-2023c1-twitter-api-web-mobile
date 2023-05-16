import Twit from "../molecules/twit";
import TwitPost from "../molecules/twitPost";
import TwApi from "../services";
import { useState,useEffect } from "react";


const Home = () => {
  const [followingTweets,setFollowingTweets] =useState();
  const [loggedUser,setLoggedUser]=useState()
  const [error,setError]=useState(false)

  useEffect(()=>{TwApi.getFollowingTweets()
                      .then(response => setFollowingTweets(response.data.results))
                      .catch(err=>{
                          console.log(err)
                          if(err.status === 404)
                            setError(true)
                      })
                 TwApi.getUser("u_1").then(response=>setLoggedUser(response.data))},[])

  if (error) return <div>error</div>

  if (!followingTweets) return <div>loading... </div>

  return (
    <>
    <div className="vh-100 overflow-auto">
      <TwitPost {...loggedUser} />
      { followingTweets.map((tweet)=><Twit twit={tweet} />)}
    </div>
    </>
  )
}

export default Home