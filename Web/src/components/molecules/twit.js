import TwitProfilePic from "../atoms/twitProfilePic";
import TwitPost from "./twitPost";
import {BsChatDots, BsChatDotsFill, BsArrowRepeat, BsHeartFill, BsHeart} from "react-icons/bs";
import { Link } from "react-router-dom";
import "./twit.css"

const Twit= ()=>{
    const objTest={class:"test", src:"https://gravatar.com/avatar/de84db04b0c7b43efdc840391ffe56ff", alt:"asd", date:"3 mayo"}
    return(
    <>
    <TwitPost {...objTest} />
    <article className="Twitt">
        
        <TwitProfilePic {...objTest}/>
        <div className="twitContainer">
            <div>
                <strong>Usuario1</strong>
                <span className="date">{objTest.date}</span>
            </div>
            <span className="textContainer">test de tiwt un 
                poquito largo de cosa de test teste testestest 
                test test test test test test test testestest test test 
                test test test test test test test test test test
            </span>
            <div className="iconsContainer">
                <button> 
                    <BsChatDotsFill className="tw-coment"/>
                </button> 
                <button>
                    <BsArrowRepeat className="tw-retwit"/>
                </button>
                <button>
                    <BsHeartFill className="tw-like"/>
                </button>
            </div>
        </div>
    </article>
    </>
    )
}

export default Twit