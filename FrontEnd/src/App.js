import  {BrowserRouter,Routes,Route} from 'react-router-dom';
import About from './Pages/about';
import Home from './Pages/home';
import Laptop from './Pages/products/laptop';
import Login from './Pages/login';
import Register from './Pages/register';
import Chat from './Components/ChatBot/chatBot';
import Product from './Pages/products';
import Products from './Components/display';
import Cart from './Pages/cart'

export default function myapp(){
  return (
    <div>
<BrowserRouter>
    <Routes>
      <Route element={<About />} path='/about' />
      <Route element={<Home />} path='/' />
      <Route element={<Laptop />} path='/laptop' />
      <Route element={<Login/>} path='/login'/>
      <Route element={<Register />} path='/register'/>
      <Route element={<Chat />} path='/chat' />
      <Route element={<Product />} path='/product'/>
      <Route element={<Products />} path='/temp'/>
      <Route element={<Cart />} path='/cart'/>
    </Routes>
</BrowserRouter>

    </div>
  );
}