import TwitProfilePic from "../atoms/twitProfilePic"
import "./twit.css"
import {BsChatDots, BsChatDotsFill, BsArrowRepeat, BsHeartFill, BsHeart} from "react-icons/bs";
import { Link } from "react-router-dom";

const Twit= (user, twit)=>{
    return(
        <article className="Twitt">
            <TwitProfilePic {...user.im}/>
            <div className="twitContainer">
                <div>
                    <strong>Usuario1</strong>
                    <span className="date">{twit.date}</span>
                </div>
                <span className="textContainer">
                    
                </span>
                <div className="iconsContainer">
                    <div className="button-stat">
                        <button> 
                            <BsChatDotsFill className="tw-coment"/>
                        </button>
                        <span>2222222222</span>
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