import TwitProfilePic from "../atoms/twitProfilePic"
import "./twit.css"
import {BsChatDots, BsChatDotsFill, BsArrowRepeat, BsHeartFill, BsHeart} from "react-icons/bs";
import { useEffect, useState } from "react";
import TwApi from "../services";
import IconButtonStat from "../atoms/iconButtonStat";


const Twit= ({twit})=>{

    
    const loggedUser = JSON.parse(localStorage.getItem('twitterLoggedUser'))

    const [user,setUser] = useState([])
    const [like,setLike] = useState(twit.likes.map(like=>like.id).includes(loggedUser.id))

    useEffect(()=>{ 
        TwApi.getUser(twit.user.id).then(response=>setUser(response.data))
    },[])

    const handleLike=()=>{
        TwApi.toggleLike(twit.id).then(response=>twit.likes=response.data.likes)
        TwApi.getLoggedUser().then(user=> setLike(twit.likes.some(like=>like.id==user.data.id)))
    }

    const handleImage=()=>twit.tipe.image? <img className="img-fluid reduce-a-cuarto" src={twit.tipe.image} alt={"test"} />: <></>

    const handleRetweet=()=><></>

    const handleReply=()=>{}

    const liked= ()=> like? <BsHeartFill className="tw-like"/>: <BsHeart className="tw-like"/>

    return(
        <article className="Twitt container-fluid mb-3">
            <TwitProfilePic image={user.image} userId={twit.user.id} />
            <div className="twitContainer">
                <div>
                    <strong> {twit.user.username} </strong>
                    <span className="date">{twit.date}</span>
                </div>
                <span className="textContainer">
                    {twit.content}
                </span>
                <div className="imageContainer">
                    {handleImage()}
                </div>
                <div className="tw-type-container">

                </div>
                <div className="iconsContainer">
                    <IconButtonStat stat={twit.repliesAmount} action={handleReply}> <BsChatDotsFill className="tw-coment"/> </IconButtonStat>
                    <IconButtonStat stat={twit.reTweetAmount} action={handleRetweet}> <BsArrowRepeat className="tw-retweet"/> </IconButtonStat>
                    <IconButtonStat stat={twit.likes.length} action={handleLike}> {liked()} </IconButtonStat>
                </div>
            </div>
        </article>
    )
}

export default Twit