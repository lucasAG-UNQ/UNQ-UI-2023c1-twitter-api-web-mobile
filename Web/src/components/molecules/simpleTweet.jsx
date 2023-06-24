import React, { useEffect, useState } from "react";
import TweetProfilePic from "../atoms/tweetProfilePic"
import TwApi from "../services";
import { Link } from "react-router-dom";
import "./simpleTweet.css"

const SimpleTweet= ({tweet})=>{
    
    const [user,setUser] = useState([])

    useEffect(()=>{ 
        TwApi.getUser(tweet.user.id).then(response=>setUser(response.data))
    },[])

    const handleImage=()=>tweet.type.image? <img className="img-fluid reduce-a-cuarto" src={tweet.type.image} alt={"Twitter pic"} />: <></>

    return(
        <Link to={`/tweet/${tweet.id}`}>
            <div className="SimpleTweet">
                <TweetProfilePic {...user} />
                    <div className="tweetContainer">
                        <div>
                            <strong> {tweet.user.username} </strong>
                            <span className="date">{tweet.date.replace("T", " a ").slice(0,18)}</span>
                        </div>
                        <span className="textContainer">
                            {tweet.content}
                        </span>
                        <div className="imageContainer">
                            {handleImage()}
                        </div>
                </div>
            </div>
        </Link>
    )
}

export default SimpleTweet