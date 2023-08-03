import React, { useEffect } from "react";
import { useState, useRef } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from "axios";
import Apiurl from "./Apiurl.js"
import Product_card from "../Components/product_card";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import * as mobilenet from "@tensorflow-models/mobilenet";

function Header() {
  const myCookie = new Cookies();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      SearchedList();
    }
  }

  const [searchCount, setSearchCount] = useState(0);
  const [productsList, setProductsList] = useState([]);
  const [searched, searchedstate] = useState(false);
  const [load, setLoad] = useState(false)

  const SearchedList = () => {
    console.log("Search Request sent to Backend for : "+document.querySelector('#search').value)
    setLoad(true)
    axios({
      url: Apiurl+"/products/search",
      method: "GET",
      params: { searchTerm: document.querySelector('#search').value }
    })
      .then((res) => {
       // console.log(res)
        console.log("Received "+res.data.count+" Results")
        setSearchCount(res.data.count)
        setProductsList(res.data.list)
        setLoad(false)
        searchedstate(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }



  // below is the code for mobilenet loading and detection of object 

  const [model, setModel] = useState(null);

  //loading model in the starting

  const loadModel = async () => {
    console.log("Loading Model......")
    try {
      const model = await mobilenet.load();
      setModel(model)
      console.log("Model loaded successfully 👍")
    }
    catch (err) {
      console.log("Error in Loading Mobilenet Model : " + err.message)
    }
  }

  useEffect(() => {
    loadModel()
  }, [])


  const [imageUrl, setImageUrl] = useState(null);
  const [results, setResults] = useState([]);

  const imageRef = useRef();

  const uploadTrigger = () => {
    imageRef.current.click();
    console.log("image Upload button triggered")
  };

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };


  const uploadImage = async (e) => {
    console.log("image uploaded ")
    setResults([]);
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageUrl(url);
      const img = await loadImage(url);
      console.log("image created as URL")
      if (model) {
        const results = await model.classify(img);
        console.log(results)
        document.querySelector('#search').value = results[0].className
        document.querySelector('#searchButton').click()

      }
    } else {
      setImageUrl(null);
      console.log("Error in image creation as URL")
    }
    // console.log(imageUrl)
  }




  return (
    <div>
      <div>
        <header className="header-home" style={{ display: "flex", justifyContent: 'space-between' }}>
          <div className="header-search-bar-container">
            <div className="header-search-bar">
              {/* <Link to='/products'> */}
              <input type="text" id="search" onKeyDown={handleKeyPress} className="header-search-input" placeholder="  Search here.." autoFocus />

              {/* </Link> */}
            </div>
            <div className="header-search-bar">
              <button className="header-search-button" id="searchButton" onClick={SearchedList}><SearchIcon sx={{ color: "white" }} /></button>
              <input type="file" accept="image/*" onChange={uploadImage} ref={imageRef} style={{ display: 'none' }} />
              <button className="header-search-button img" onClick={uploadTrigger}><ImageSearchIcon sx={{ color: "white" }} /></button>
            </div>
          </div>
          <div className="header-buttons">
            <a href="/home" className="button">Home</a>
            <a href="/cart" className="button">Cart<ShoppingCartIcon fontSize="small" /></a>
            <a href="/favs" className="button" ><FavoriteIcon />Favorites</a>
            <a href='/about' className="button">About</a>

          </div>

        </header>
      </div>

      {searched ?
        <div>
          <h3 style={{ textAlign: "center" }}>{searchCount} Items found </h3>
          <div className="product-card" >

            {
              productsList.map(product =>
                <Product_card
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  discount={product.discount}
                  image={product.imgurl}

                />
              )
            }
          </div>
          <hr styles={"height:2px;border-width:0;color:gray;background-color:gray"} />
        </div>
        : <>{load && <div>
          <h3>Getting Your Products...</h3>
          <img src="https://cdn.dribbble.com/users/642104/screenshots/6269396/cart_drbl.gif" style={{ width: '100%', height: '80vh' }} alt="" />
        </div>}
        </>}
    </div>
  );
}

export default Header;

