import React from "react";
import { TwitterFollowCard } from "./TwitterFollowCard";

// These usually come from an API call
const users = [
    {
        userName: "midudev",
        name: "Miguel Angel Duran",
        isFollowing: true,
    },
    {
        userName: "pheralb",
        name: "Pablo Heraldo",
        isFollowing: false,
    },
    {
        userName: "elonmusk",
        name: "Elon Musk",
        isFollowing: false,
    },
    {
        userName: "vxnder",
        name: "Vanderhart",
        isFollowing: false,
    },

]

export function App() {
    return (
        <section className="App">
            {
                users.map(({ userName, name, isFollowing }) => (
                    <TwitterFollowCard
                        key={userName}
                        userName={userName}
                        name={name}
                        initialIsFollowing={isFollowing}
                    >
                        {name}
                    </TwitterFollowCard>
                ))
            }
        </section>
    )
}