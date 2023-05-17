
const IconButtonStat= ({children,stat,action})=>{
    const handle=(event)=>{
        event.preventDefault()
        action.call()
    }

    return(
        <div className="button-stat">
            <button onClick={event=>handle(event)}> 
                {children}
            </button>
            <span> {stat} </span>
        </div>
    )
}

export default IconButtonStat