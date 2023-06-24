import React from 'react';
import TwApi from "../services"
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import FullTweetWithActions from "../molecules/fullTweetWithActions"
import Retweet from '../molecules/reTweet';
import ReplyTweet from '../molecules/replyTweet';

const Tweet = () => {
  const  { id } = useParams();

  const [tweet,setTweet] = useState('');
  const [error,setError] = useState('');

  useEffect(()=>{TwApi.getTweet(id)
                      .then(response => {
                        setTweet(response.data);
                        setError('');
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

  if (!tweet && !error) return <div className="fw-bold mb-2">Loading... </div>
  return (
    <div className="vh-100 overflow-auto">
      <h1 className="fw-bold mb-4 p-4">Tweet</h1>
        {(tweet)?decideTweet(tweet):<p>{error}</p> }
        <div className='replies'>{tweet.replies.map(reply=><FullTweetWithActions tweet={reply} key={reply.id} />)}</div>
    </div>
  )
}

export default Tweet