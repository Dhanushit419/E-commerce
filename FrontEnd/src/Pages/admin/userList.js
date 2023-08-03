
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Apiurl from '../../Components/Apiurl.js'


export default function Dashboard() {
    useEffect(() => {
        document.title = "Users List - Trendify"
    }, [])

    const [userlist, setuserlist] = useState([{ username: 'nantha' }]);
    useEffect(() => {
        axios({
            url: Apiurl + '/admin/userlist',
            method: 'GET'

        })
            .then((res) => {
                setuserlist([...res.data.list]);
                console.log("Number of Users : "+res.data.list.length);
                //console.log(userlist)
            })

    }, [])

    return (
        <div>
            {
                userlist.map((user) =>
                    <h1>{user.username}</h1>)

            }
        </div>
    );
}

