import React from "react"
import { Link } from "react-router-dom"

const TwitProfilePic= ({image,username})=>{
    return(
        <Link to={"/user/"+username}>
            <img height={48} className={"rounded-circle"} src={image} alt={"profile_pic"}/>
        </Link>
    )
}

export default TwitProfilePic