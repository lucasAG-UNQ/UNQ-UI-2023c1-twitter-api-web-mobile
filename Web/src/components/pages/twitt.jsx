import React from 'react';
import TwApi from "../services"
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import FullTwittWithActions from "../molecules/fullTwittWithActions"
import Retweet from '../molecules/reTweet';
import ReplyTwitt from '../molecules/replyTwitt';

const Twitt = () => {
  const  { id } = useParams();

  const [twitt,setTwitt] = useState('');
  const [error,setError] = useState('');

  useEffect(()=>{TwApi.getTwitt(id)
                      .then(response => {
                        setTwitt(response.data);
                        setError('');
                      })
                      .catch((error) => setError(error.description))
                },[id])

  const decideTwit=(twit)=>{
        if(twit.type.tweet==null){
            return <FullTwittWithActions twit={twit} key={twit.id} />
        }else if(twit.type.image==null){
            return <Retweet twit={twit} key={twit.id} />
        }else{
            return <ReplyTwitt twit={twit} key={twit.id}/>
        }
  }

  if (!twitt && !error) return <div className="fw-bold mb-2">Loading... </div>
  return (
    <div className="vh-100 overflow-auto">
      <h1 className="fw-bold mb-4 p-4">Twitt</h1>
        {(twitt)?decideTwit(twitt):<p>{error}</p> }
        <div className='replies'>{twitt.replies.map(reply=><FullTwittWithActions twit={reply} key={reply.id} />)}</div>
    </div>
  )
}

export default Twitt