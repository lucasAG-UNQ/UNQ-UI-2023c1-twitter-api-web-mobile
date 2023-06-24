import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TwApi from "../services";
import "../../styles/molecules/userCard.css";

const LoggedUserCard = () => {
    const [loggedUser, setLoggedUser] = useState();

    useEffect(() => {
      TwApi.getLoggedUser()
          .then((response) => {
              setLoggedUser(response.data);
          })    
  }, []);

    if (!loggedUser) return <div>Loading... </div>;

    return (
        <div className="card bg-transparent text-center">
            <div className="card-body">
                <NavLink
                    to="/profile"
                    className="text-reset text-decoration-none"
                >
                    <div className="profile-sidebar">
                        <img
                            className="rounded-circle"
                            alt=""
                            src={loggedUser?.image}
                        />
                    </div>
                    <p className="card-title font-weight-bold">
                        {loggedUser?.username}
                    </p>
                </NavLink>
            </div>
        </div>
    );
};

export default LoggedUserCard;
