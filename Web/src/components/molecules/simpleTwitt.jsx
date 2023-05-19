import React, { useEffect, useState } from "react";
import TwitProfilePic from "../atoms/twitProfilePic"
import TwApi from "../services";
import { Link } from "react-router-dom";
import "./simpleTwit.css"

const SimpleTwitt= ({twit})=>{
    
    const [user,setUser] = useState([])

    useEffect(()=>{ 
        TwApi.getUser(twit.user.id).then(response=>setUser(response.data))
    },[])

    const handleImage=()=>twit.type.image? <img className="img-fluid reduce-a-cuarto" src={twit.type.image} alt={"test"} />: <></>

    return(
        <Link to={`/twitt/${twit.id}`}>
            <div className="SimpleTwitt">
                <TwitProfilePic {...user} />
                    <div className="twitContainer">
                        <div>
                            <strong> {twit.user.username} </strong>
                            <span className="date">{twit.date.replace("T", " a ")}</span>
                        </div>
                        <span className="textContainer">
                            {twit.content}
                        </span>
                        <div className="imageContainer">
                            {handleImage()}
                        </div>
                        <div className="tw-type-container">

                        </div>
                </div>
            </div>
        </Link>
    )
}

export default SimpleTwitt