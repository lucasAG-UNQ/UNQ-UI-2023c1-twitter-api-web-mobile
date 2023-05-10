import TwitProfilePic from "../atoms/twitProfilePic"
import "./twitPost.css"

const TwitPost= (usuario)=>{
    return(
        <div className="twitPostContainer">
            <TwitProfilePic {...usuario}/>
            <form className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                    <input className="form-control" id="inputTwit" placeholder="¿Qué está pasando?"/>
                </div>
                <button type="submit" className="btn btn-primary mb-2">Twittear</button>
            </form>
        </div>
    )
}

export default TwitPost