import TwitProfilePic from "../atoms/twitProfilePic"
import "./twit.css"
import {BsChatDots, BsChatDotsFill, BsArrowRepeat, BsHeartFill, BsHeart} from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";




const Twit= ({userImage, twit})=>{

    
{/*const axios = require("axios"); esto no funciona, funciona solo con el import axios from "axios"*/}
    const [user,setUser] = useState([])
    const [like,setLike] = useState([])

    async function getUser(){
        const userTest= await   axios({method:'get',
                                        url:'/user/u_1'})
        setUser(userTest.data)
    }
    
    
    useEffect(()=>{getUser()},[])

    return(
        <article className="Twitt">
            <TwitProfilePic image={user.image} username={twit.user.username} />
            <div className="twitContainer">
                <div>
                    <strong>Usuario1</strong>
                    <span className="date">{twit.date}</span>
                </div>
                <span className="textContainer">
                    {twit.content}
                </span>
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
                        <span>22222</span>
                    </div>
                    <div className="button-stat">
                        <button> 
                            <BsHeart className="tw-coment"/>
                        </button>
                        <span>222222222</span>
                    </div>
                    {/*<button> 
                        <BsChatDotsFill className="tw-coment"/>
                    </button> 
                    <button>
                        <BsArrowRepeat className="tw-retwit"/>
                    </button>
                    <button>
                        <BsHeart className="tw-like"/>
                    </button>*/}
                </div>
            </div>
        </article>
    )
}

export default Twit