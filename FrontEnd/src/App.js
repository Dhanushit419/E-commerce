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
import Favs from './Pages/favs'
import A from './test/1'
import B from './test/2'
import Payment from './Pages/payment'
import Img from './Pages/img'

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
      <Route element={<Favs/>}  path='/favs'/>
      <Route element={<A/>}  path='/a'/>
      <Route element={<B/>}  path='/b'/>

      <Route element={<Payment/>}  path='/payment'/>
      <Route element={<Img/>}  path='/i'/>




    </Routes>
</BrowserRouter>

    </div>
  );
}