
const IconButtonStat= ({children,stat,action})=>{
    return(
        <div className="button-stat">
            <button onClick={action}> 
                {children}
            </button>
            <span> {stat} </span>
        </div>
    )
}

export default IconButtonStat