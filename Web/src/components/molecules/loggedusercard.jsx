import React from 'react';
import { NavLink } from 'react-router-dom'

const LoggedUserCard = () => {
  return (
    <div className="card bg-transparent text-center">
        <div className="card-body">
            <NavLink to="/profile" className="text-reset text-decoration-none">
                <div>
                    <img className="rounded-circle" alt="" src="https://gravatar.com/avatar/de84db04b0c7b43efdc840391ffe56ff" />
                </div>
                <p className="card-title font-weight-bold">@nombre</p>
            </NavLink>
        </div>
    </div>
  )
}

export default LoggedUserCard