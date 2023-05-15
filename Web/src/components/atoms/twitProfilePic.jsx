import React from "react"
import { Link } from "react-router-dom"

const TwitProfilePic= ({image,username})=>{
    return(
        <div className="twit_profile_pic_container">
            <Link to={"/user/"+username}>
                <img height={48} className={"rounded-circle"} src={image} alt={"pp"}/>
            </Link>
        </div>
    )
}

export default TwitProfilePic