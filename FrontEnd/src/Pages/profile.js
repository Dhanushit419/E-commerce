import React from "react";
import { Cookies } from "react-cookie";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function(){
    const navigate = useNavigate();
    const myCookie = new Cookies();
    const email=myCookie.get("username");

    const LogOut=()=>{
        myCookie.remove("username");
        localStorage.clear();
        navigate("/");
    }
    return <div>

        {email ? <h1>iruku</h1>:<h1>illa</h1>}
        <h1>Na than pa Profile page uh {email}</h1>
        <Button onClick={LogOut}>
            Log out
        </Button>

    </div>
}