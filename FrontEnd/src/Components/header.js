import React, { useEffect } from "react";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { IconButton, TextField } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from "axios";
import Product_card from "../Components/product_card";
import { Cookies } from "react-cookie";
// import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";


function Header(){
  const myCookie=new Cookies();
  // const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('')
 
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      SearchedList();
    }
  }

  // const handleOnFocus=()=>{
  //   history.push('/products');
  // }

  const [searchCount,setSearchCount] =useState(0);
  const [productsList,setProductsList]=useState([]);
  const [searched,searchedstate]=useState(false);

  const SearchedList =()=>{
    searchedstate(true)
    axios({
      url:"http://localhost:3001/search",
      method:"GET",
      params: {searchTerm}
    })
    .then((res)=>{
      console.log(res)
      setSearchCount(res.data.count)
      setProductsList(res.data.list)
    })
    .catch((err)=>{
      console.log(err)
    })
  }



    return(
    <div>
        <div>
        <header className="header-home" style={{display:"flex",justifyContent:'space-between'}}>
        <div className="header-search-bar-container">
        <div className="header-search-bar">
          {/* <Link to='/products'> */}
          <input type="text" id="search" value={searchTerm} onChange={handleInputChange} onKeyDown={handleKeyPress}  className="header-search-input"  placeholder="  Search here.." autoFocus/>

          {/* </Link> */}
        </div>
        <div className="header-search-bar">
          <button className="header-search-button" onClick={SearchedList}><SearchIcon sx={{ color: "white"}}/></button>
          <button className="header-search-button img"><ImageSearchIcon sx={{ color: "white"}}/></button>
        </div>
      </div>
          <div className="header-buttons">
          <a href="\home" className="button">Home</a>
          <a href='\about' className="button">About</a>
          <a href="\cart" className="button">Ca<ShoppingCartIcon fontSize="small"/>rt</a>
          
          </div>
          
        </header>
      </div>

      {searched?
        <div>
          <h3 style={{textAlign:"center"}}>{searchCount} Items found </h3>
          <div className="product-card" >
            
          {
              productsList.map( product =>
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
      :<></>}
      </div>
    );
  }

  export default Header;



  // <Button startIcon={<ArrowBackIosOutlinedIcon/>} onClick={()=>{navigate('/products')}} variant="outlined" sx={{color:'white',border:'none'}}>Go to Product Page</Button>
  // import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
