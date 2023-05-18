import FullTwittWithActions from "../molecules/fullTwittWithActions";
import TwitPost from "../molecules/twitPost";
import TwApi from "../services";
import { useState,useEffect } from "react";
import TwitLog from "../organisms/twitLog";


const Home = () => {


  const [followingTweets,setFollowingTweets] =useState();
  const [error,setError]=useState(false)

  useEffect(()=>{TwApi.getFollowingTweets()
                      .then(response => setFollowingTweets(response.data.results))
                      .catch(err=>{
                          console.log(err.description)
                            setError(true)
                      })},[])

  if (error) return <div>Ups... algo salio mal</div>

  if (!followingTweets) return <div>loading... </div>

  return (
    <>
    <div className="vh-100 overflow-auto ">
      <TwitPost />
      { followingTweets.map((tweet)=><FullTwittWithActions twit={tweet} key={Math.floor(Math.random() * 100000) + 1}/>)}
      <TwitLog twits={followingTweets} />
    </div>
    </>
  )
}

export default Home