const TwitProfilePic= (user)=>{
    return(
        <img height={48} className={"rounded-circle "+user.class} src={user.src} alt={user.alt}/>
    )
}

export default TwitProfilePic