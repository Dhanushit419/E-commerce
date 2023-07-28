import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import{ Link} from "react-router-dom";

export default function Header1(){
    const navigate=useNavigate()
    const myCookie = new Cookies();
    const username=myCookie.get("username");
    const LogOut=()=>{
        myCookie.remove("username");
        localStorage.clear();
        navigate("/");
    }
  
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
                  <a href='\sellproduct' className="button">Become A Seller</a>
                  <a className="button" style={{display:'flex',alignItems:'center',columnGap:'5px'}} onClick={LogOut} ><span>Logout</span><LogoutIcon fontSize="very-small"/> </a>
                  
                  </div>
                  
                </header>
              </div>
              </div>
            );
}