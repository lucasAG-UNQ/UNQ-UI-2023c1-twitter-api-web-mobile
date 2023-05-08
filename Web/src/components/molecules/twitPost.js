import TwitProfilePic from "../atoms/twitProfilePic"
import "./twitPost.css"

const TwitPost= (usuario)=>{
    return(
        <div className="twitPostContainer">
            <TwitProfilePic {...usuario}/>
            <form class="form-inline">
                <div class="form-group mx-sm-3 mb-2">
                    <input class="form-control" id="inputTwit" placeholder="¿Qué está pasando?"/>
                </div>
                <button type="submit" class="btn btn-primary mb-2">Twittear</button>
            </form>
        </div>
    )
}

export default TwitPost