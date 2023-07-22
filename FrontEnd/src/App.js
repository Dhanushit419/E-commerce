import  {BrowserRouter,Routes,Route} from 'react-router-dom';
import About from './Pages/about';
import Home from './Pages/home';
import Login from './Pages/login';
import Register from './Pages/register';
import Chat from './Components/ChatBot/chatBot';
import Product from './Pages/products';
import View from './Pages/display';
import Cart from './Pages/cart';
import SellProducts from './Pages/sellProduct';
import Profile  from './Pages/profile';
import Orders from './Pages/orders';
import OrderSuccess from './Pages/orderSuccess';
import A from './test/1'



export default function myapp(){
  return (
    <div>
<BrowserRouter>
    <Routes>
      <Route element={<About />} path='/about' />
      <Route element={<Home />} path='/home' />
      <Route element={<Login/>} path='/'/>
      <Route element={<Login/>} path='/login'/>
      <Route element={<Register />} path='/register'/>
      <Route element={<Chat />} path='/chat' />
      <Route element={<Product />} path='/products'/>
      <Route element={<View />} path='/view'/>
      <Route element={<View />} path='/view/productid/:id'/>
      <Route element={<Cart />} path='/cart'/>
      <Route element={<SellProducts />} path='/sellproduct'/>
      <Route element={<Profile />}  path='/profile'/>
      <Route element={<Orders />}  path='/orders'/> 
      <Route element={<OrderSuccess />}  path='/orderSuccess'/>
      <Route element={<A/>}  path='/a'/>



    </Routes>
</BrowserRouter>

    </div>
  );
}