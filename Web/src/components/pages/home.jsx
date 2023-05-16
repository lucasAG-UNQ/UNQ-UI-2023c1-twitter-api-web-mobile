import Twit from "../molecules/twit";
import TwitPost from "../molecules/twitPost";
import TwApi from "../services";
import { useState,useEffect } from "react";
import TwitLog from "../organisms/twitLog";


const Home = () => {

  const loggedUser = JSON.parse(localStorage.getItem('twitterLoggedUser'))

  const [followingTweets,setFollowingTweets] =useState();
  const [error,setError]=useState(false)

  useEffect(()=>{TwApi.getFollowingTweets()
                      .then(response => setFollowingTweets(response.data.results))
                      .catch(err=>{
                          console.log(err)
                            setError(true)
                      })},[])

  if (error) return <div>Ups... algo salio mal</div>

  if (!followingTweets) return <div>loading... </div>

  return (
    <>
    <div className="vh-100 overflow-auto">
      <TwitPost {...loggedUser} />
      { followingTweets.map((tweet)=><Twit twit={tweet} />)}
      <TwitLog twits={followingTweets} />
    </div>

    </>
  )
}

export default Home