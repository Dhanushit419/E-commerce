import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header(){
    return(
      <div>
        <header className="header-home" style={{display:"flex",justifyContent:'space-between'}}>
        <div className="header-search-bar-container">
        <div className="header-search-bar">
          <input type="text" className="header-search-input" placeholder="  Search here.." />
        </div>
        <div className="header-search-bar">
          <button className="header-search-button"><SearchIcon sx={{ color: "white"}}/></button>
          <button className="header-search-button img"><ImageSearchIcon sx={{ color: "white"}}/></button>
        </div>
      </div>
          <div className="header-buttons">
          <a href="\" className="button">Home</a>
          <a href='\about' className="button">About</a>
          <a href="\cart" className="button">Ca<ShoppingCartIcon fontSize="small"/>rt</a>
          
          </div>
          
        </header>
      </div>
    );
  }

  export default Header;