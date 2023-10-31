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
import OpenAI from 'openai'

function Header() {
  const myCookie = new Cookies();
  const queryParameters = new URLSearchParams(window.location.search)
  const name = queryParameters.get("name");

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
  const [modelLoading,setModelLoading]=useState(true)


  const API_KEY="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";

  const openai = new OpenAI({
      apiKey: API_KEY, // defaults to process.env["OPENAI_API_KEY"]
      dangerouslyAllowBrowser: true
  });


 const[gptArray,gptArrayFunction]=useState([])

 
async function check(iname) {
  const response =  await openai.chat.completions.create({
          messages: [{ role: 'system', content: "Here is the list of products : ['Ethnic Wear Collection', 'Fridge ', 'Nikon camera', 'Mixer Grinder (3 jars)', 'Poco -Xiamo Mobile Phone', 'IQOO Z7 5G (Pacific Night, 128 GB)  (6 GB RAM)', 'oneplus11 5g mobile', 'T-Shirts (Buy1Get2)', 'Stunning Sunglasses', 'Camaro remote control car', 'pearl childrens raincoat', 'Cooker', 'Travel Bags', 'Raincoat', 'Sofa 3 Seater', 'Dining Tables', 'Memorable Greeting Cards', 'womens ethnic wear', 'womens ethnic wear', 'vip travel bag', 'assembly trolley travel bag', 'yellow raincoat', 'love greeting card', 'us polo blue mens tshirt', 'adidas mens tshirt', 'puma mens tshirt', 'lg fridge', 'samsung fridge', 'canon dslr camera', 'godrej sofa set', 'haley sofaset', 'rectangular modern sofaset', 'Water Bottles', 'Coffee cup', 'Hero helmet', 'Werner ladder', 'Air conditioner', 'Artifical jewellery', 'Night suit', 'EAFU power bank', 'Selfie stick', 'Pendrive', 'Wired mouse', 'Printer', 'Logi speakers', 'Vacuum cleaner', 'Samsung sound bar', 'Sony home theater', 'One sports shoe', 'Round Nylon umbrella', 'Whirlpool washing machine front load', 'yellow sweater', 'inverno sweater', 'mia sweater for women', 'samsung s23 ultra mobile', 'ipad', 'Digital Watch', 'macbook', 'hp pavilion laptop', 'red mens fashionable shirt', 'mens blue shirt', 'steam cooker', 'hawkins induction cooker', 'electric pressure cooker', 'preethi zodiac mixer', 'breville handmixer', 'sony dslr camera', 'Hairband', 'asus rog laptop', 'Sweater', 'Philips trimmer', 'Powerful and Portable Laptop!', 'Samsung smart tv', 'cool sneakers', ' Boat smart watch', 'birthday greeting card', 'L shape sofa set', ' greenlands grey travel bag', 'white basic hoodie', 'iphone 14 pro max', 'Denim Shirt', 'Hoodies'].from this suggest 3  items which are most related to "+ iname +". give items strictly (no other text needed) in the format (item1/item2/item3)" }],
          model: 'gpt-3.5-turbo',
  })
 const suggestion= (response.choices[0].message.content);
 const suggestion_array=suggestion.split('/');
 gptArrayFunction(suggestion_array);
 console.log(suggestion_array);

 }

  const SearchedList = () => {
    var iname = document.querySelector('#search').value;
    console.log("Search Request sent to Backend for : "+document.querySelector('#search').value)
    setLoad(true)
    axios({
      url: Apiurl+"/products/search",
      method: "GET",
      params: { searchTerm: document.querySelector('#search').value.toLowerCase() }
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
      check(iname);
  }



  // below is the code for mobilenet loading and detection of object 

  const [model, setModel] = useState(null);

  //loading model in the starting

  const loadModel = async () => {
    console.log("Loading Model......")
    try {
      const model = await mobilenet.load();
      setModel(model)
      setModelLoading(false)
      console.log("Model loaded successfully 👍")
    }
    catch (err) {
      console.log("Error in Loading Mobilenet Model : " + err.message)
    }
  }
  useEffect(() => {
    document.querySelector('#search').value = name;
    name && SearchedList();
    name && searchedstate(true);
    loadModel()
  }, [])

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
              {modelLoading?<button className="header-search-button img" ><img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" style={{height:'20px',width:'20px'}} alt="" /></button>
              :
              <button className="header-search-button img" onClick={uploadTrigger}><ImageSearchIcon sx={{ color: "white" }} /></button>
              }
            </div>
          </div>
          <div className="header-buttons">
            <a href="/home" className="button">Home</a>
            <a href="/profile" className="button" >Profile</a>
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

          <h2 style={{textAlign:"center"}}>Related Products</h2> 
          <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
            {gptArray.map(i=>{
              return <div onClick={()=>{
                document.querySelector("#search").value = i;
                window.scrollTo(0,0);
                SearchedList();
              }} className="s-btn" style={{margin:'20px',padding:"10px 20px",borderRadius:"99em"}}> {i}
              </div>
            })}
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

