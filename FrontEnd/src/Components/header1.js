import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import{ Link} from "react-router-dom";

export default function Header1(){
    const navigate=useNavigate()

        return(
            <div>
                <div>
                <header className="header-home" style={{display:"flex",justifyContent:'space-between'}}>
                <div className="header-search-bar-container">
                <div className="header-search-bar">
                 <Link to='/products'>
                  <input type="text" id="search"  className="header-search-input-header1"  placeholder="  Search here.."/>
                  </Link>
                </div>
                <div className="header-search-bar">
                  <button className="header-search-button" onClick={()=>{navigate("/products")}}><SearchIcon sx={{ color: "white"}}/></button>
                  <button className="header-search-button img"><ImageSearchIcon sx={{ color: "white"}}/></button>
                </div>
              </div>
                  <div className="header-buttons">
                  <a href="\home" className="button">Home</a>
                  <a href='\about' className="button">About</a>
                  <a href="\profile" className="button">Profile</a>
                  
                  </div>
                  
                </header>
              </div>
              </div>
            );
}