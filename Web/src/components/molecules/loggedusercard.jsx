import React from 'react';
import { NavLink } from 'react-router-dom'

const LoggedUserCard = () => {

  const loggedUser = JSON.parse(localStorage.getItem('twitterLoggedUser'))

  return (
    <div className="card bg-transparent text-center">
        <div className="card-body">
            <NavLink to="/profile" className="text-reset text-decoration-none">
                <div>
                    <img className="rounded-circle" alt="" src={loggedUser?.image} />
                </div>
                <p className="card-title font-weight-bold">{loggedUser?.username}</p>
            </NavLink>
        </div>
    </div>
  )
}

export default LoggedUserCard