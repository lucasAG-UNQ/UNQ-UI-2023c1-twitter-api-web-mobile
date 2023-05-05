const TwitProfilePic= ({className,src,alt})=>{
    return(
        <img height={48} className={"rounded-circle "+className} src={src} alt={alt}/>
    )
}

export default TwitProfilePic