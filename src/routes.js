import { Component } from "react";
import Signin from "./views/auth/Signin";
import Signup from "./views/auth/Signup";
import Listings from "./views/Listings";
import Player from "./views/Player";

var routes = [
    {
        path: "/",
        component: Listings,
        layout: "admin", 
    },
    {
        path: "/player/:id",
        component: Player,
        layout: "admin", 
    },
    {
        path: "/signin",
        component: Signin,
        layout: "auth", 
    },
    {
        path: "/signup",
        component: Signup,
        layout: "auth", 
    },

];

export default routes;