import React from 'react';
import TwApi from "../services"
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import FullTweetWithActions from "../molecules/fullTweetWithActions"
import Retweet from '../molecules/reTweet';
import ReplyTweet from '../molecules/replyTweet';

const Tweet = () => {
  const  { id } = useParams();

  const [tweet,setTweet] = useState(null);
  const [error,setError] = useState(null);

  useEffect(()=>{TwApi.getTweet(id)
                      .then(response => {
                        if (!!response.data) {
                          setTweet(response.data);
                          setError(null);
                        }
                        else {
                          setError('No se encontró el tweet.');
                        }
                      })
                      .catch((error) => setError(error.description))
                },[id])

  const decideTweet=(tweet)=>{
        if(tweet.type.tweet==null){
            return <FullTweetWithActions tweet={tweet} key={tweet.id} />
        }else if(tweet.type.image==null){
            return <Retweet tweet={tweet} key={tweet.id} />
        }else{
            return <ReplyTweet tweet={tweet} key={tweet.id}/>
        }
  }

  if (error) return (
    <>
      <h2>Ups... algo salió mal</h2>
      <p className="etiquetaRoja">{error}</p></>
    )

  if (!tweet && !error) return <div className="fw-bold mb-2">Loading... </div>

  return (
    <div className="vh-100 overflow-auto">
      <h1 className="fw-bold mb-4 p-4">Tweet</h1>
        { decideTweet(tweet) }
        <div className='replies'>{tweet.replies.map(reply=><FullTweetWithActions tweet={reply} key={reply.id} />)}</div>
    </div>
  )
}

export default Tweet