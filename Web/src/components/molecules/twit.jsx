import TwitProfilePic from "../atoms/twitProfilePic"
import "./twit.css"
import {BsChatDots, BsChatDotsFill, BsArrowRepeat, BsHeartFill, BsHeart} from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import TwApi from "../services";


const Twit= ({twit})=>{

    const [user,setUser] = useState([])
    const [like,setLike] = useState(false)

    useEffect(()=>{TwApi.getUser(twit.user.id).then(data=>setUser(data))},[user])

    const handleLike=()=>{
        TwApi.toggleLike(twit.id).then(_=>setLike(!like))
    }
    
    return(
        <article className="Twitt">
            <TwitProfilePic image={user.image} username={twit.user.username} />
            <div className="twitContainer">
                <div>
                    <strong> {twit.user.username} </strong>
                    <span className="date">{twit.date}</span>
                </div>
                <span className="textContainer">
                    {twit.content}
                </span>
                <div className="tw-type-container">

                </div>
                <div className="iconsContainer">
                    <div className="button-stat">
                        <button> 
                            <BsChatDotsFill className="tw-coment"/>
                        </button>
                        <span>{twit.repliesAmount}</span>
                    </div>
                    <div className="button-stat">
                        <button> 
                            <BsArrowRepeat className="tw-coment"/>
                        </button>
                        <span> {twit.reTweetAmount} </span>
                    </div>
                    <div className="button-stat">
                        <button> 
                            <BsHeart className="tw-coment"/>
                        </button>
                        <span> {twit.likes.length} </span>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Twit