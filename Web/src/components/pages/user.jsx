import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TwitLog from "../organisms/twitLog";
import UserCard from "../molecules/userCard";
import TwApi from "../services";
import { useEffect } from "react";

const User = () => {
    const { id } = useParams();

    // const loggedUser = JSON.parse(localStorage.getItem('twitterLoggedUser'))
    const [user, setUser] = useState();
    const [twitts, setTwitts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        TwApi.getUser(id)
            .then((response) => {
                setUser(response.data);
                setTwitts(response.data.tweets);
            })
            .catch((err) => {
                setError(err.description);
            });
    }, [id]);

    if (error)
        return (
            <>
                <h2>Ups... algo salió mal</h2>
                <p className="etiquetaRoja">{error}</p>
            </>
        );
    if (!twitts || !user) return <div>Loading... </div>;

    return (
        <>
            <section>
                <UserCard {...user} />
            </section>
            <section>
                <TwitLog twits={twitts} />
            </section>
        </>
    );
};

export default User;
