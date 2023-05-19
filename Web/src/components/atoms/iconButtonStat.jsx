
const IconButtonStat= ({children,stat,action,title})=>{
    const handle=(event)=>{
        event.preventDefault()
        action()
    }

    return(
        <div className="button-stat">
            <button onClick={event=>handle(event)} title={title}> 
                {children}
            </button>
            <span> {stat} </span>
        </div>
    )
}

export default IconButtonStat