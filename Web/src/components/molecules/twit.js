import TwitProfilePic from "../atoms/twitProfilePic";
import {BsChatDots, BsChatDotsFill, BsArrowRepeat, BsHeartFill, BsHeart} from "react-icons/bs";
import { Link } from "react-router-dom";
import "./twit.css"

const Twit= ()=>{
    const objTest={className:"test", src:"https://gravatar.com/avatar/de84db04b0c7b43efdc840391ffe56ff", alt:"asd", date:"3 mayo"}
    return(
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
                
                <BsChatDots className="tw-coment"/>
                <BsArrowRepeat className="tw-retwit"/>
                <BsHeart className="tw-like"/>
                {/*<img className="tw-coment" src="" alt="test"></img>
                <img className="tw-ico" src="" alt="test"></img>
                <img className="tw-ico" src="" alt="test"></img>*/}
            </div>
        </div>

    </article>
    )
}

export default Twit