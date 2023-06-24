import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TweetLog from "../organisms/tweetLog";
import UserCard from "../molecules/userCard";
import TwApi from "../services";
import { useEffect } from "react";

const User = () => {
    const { id } = useParams();

    const [user, setUser] = useState();
    const [tweets, setTweets] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        TwApi.getUser(id)
            .then((response) => {
                setError('');
                setUser(response.data);
                setTweets(response.data.tweets);
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
    if (!tweets || !user) return <div>Loading... </div>;

    return (
        <div className="vh-100 overflow-auto">
            <section>
                <UserCard {...user} />
            </section>
            <section>
                <TweetLog tweets={tweets} />
            </section>
        </div>
    );
};

export default User;
