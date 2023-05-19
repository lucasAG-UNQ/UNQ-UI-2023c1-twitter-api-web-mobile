import React from "react"
import { Link } from "react-router-dom"

const TwitProfilePic= ({image, id})=>{
    return(
        <div className="twit_profile_pic_container">
            <Link to={`/user/${id}`}>
                <img height={48} className={"rounded-circle"} src={image} alt={"ProfilePic"}/>
            </Link>
        </div>
    )
}

export default TwitProfilePic