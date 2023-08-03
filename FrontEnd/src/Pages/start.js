import React, { useState, useEffect } from "react";
import axios from "axios";
import Apiurl from '../Components/Apiurl.js'
import Loading from "../Components/loading";
import { useNavigate } from "react-router-dom";
import url from "../Components/Apiurl.js";
export default function Start() {
    const navigate = useNavigate()
    //to get the list of products from the database

    const [productsList, setProductsList] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        //to get the list of products
        axios({
            url: Apiurl + "/products/getproductlist",
            method: "GET"
        })
            .then((res) => {
                setProductsList(res.data.list)
            })
            .catch((err) => {
                console.log(err)
            })

        //to get the review list

        axios({
            url: Apiurl + '/others/getreviews',
            method: 'GET'
        })
            .then((res) => {
                setReviews(res.data.list)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (productsList.length > 0 && reviews.length > 0) {
            localStorage.setItem('productsList', JSON.stringify(productsList))
            localStorage.setItem('reviews', JSON.stringify(reviews))
            console.log(productsList.length+" Products fetched")
            console.log(reviews.length+" Reviews fetched")
            setLoading(false);
        }
    }, [productsList, reviews]);


    useEffect(() => {
        if (!loading) {
            navigate('/login')
        }
    }, [loading])

    return (
        <div className="start">
            {loading && <Loading text="Please Wait a Moment.. ✨" />}
        </div>
    )
}