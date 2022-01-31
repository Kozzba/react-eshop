import './App.css';
import Product from './product';
import ProductForm from './productForm';
import CartSvg from './cartSvg';
import SearchBar from './search';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const [cart, setCart] = useState([]);
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(true);

  console.log(data);
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchQuery, setSearchQuery] = useState(query || '');

  const onNewProductHandler = (product) => {
    const newData = [...data];
    console.log("Byl vytvoren produkt " + data);
    newData.push(product);
    setData(newData);
  }

  const filterProducts = (products, query) => {
    if (!query) {
        return products;
    }

    return products.filter((product) => {
        const postName = product.name.toLowerCase();
        return postName.includes(query);
    });
  };

  const filteredPosts = filterProducts(data, searchQuery);

  useEffect(() => {
    setTimeout( () => {
      fetch("http://localhost:3001/products")
        .then(response => {
          if (response.ok) {
            return response.json(); 
          }
          throw new Error("Enable get data: " + response.statusText)
        })
        .then(json => setData(json))
        .catch((err) => setError(err.message))
        .finally(() => setIsPending(false))
    },1000);
  }, [])

  const addToCartHandler = function (product) {
    const newCart = [...cart];
    console.log("Nakoupil sis zbozi " + product);
    newCart.push(product);
    setCart(newCart);
  }

  const removeFromCartHandler = function(product) {
    const newCart = [...cart];
    const productIndex = newCart.findIndex(item=> item.id === product.id);
    newCart.splice(productIndex, 1);
    setCart(newCart);
  }

  return (
    <Router>
    <div className="App">

      <nav style={{
        display: "flex",
        padding: "10px 10px 10px 10px",
        width: "100%",
        height: "80px"}}>
          <div style={{
            width: "30%",
            backgroundColor: "#9ad2e1"}}>
            <h1>ALZA</h1>
          </div>
          <Link to="/" className="navLink">
            Home
          </Link>
          <Link to="/edit-product" className="navLink">
            Edit Product
          </Link>          
          <Link to="/cart" className="navLink">
            Cart
          </Link>
          
          <div style={{
            backgroundColor: "#55747c"
          }}>
          <CartSvg/>
          {<div>{cart.length}</div>}
          </div>
      </nav>


      <Switch>
        <Route path="/edit-product">
          <ProductForm onNewProduct={onNewProductHandler}/>
        </Route>
        <Route path="/cart">
          <h1>Shopping cart</h1>
          {cart.map(item=> <div>{item} <button onClick={() => removeFromCartHandler(item)}>-</button></div>)}
        </Route>
        <Route path="/">
          {isPending && "Loading data..."}
          {error && <div>{error}</div>}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            margin: "5px"
          }}>
            {filteredPosts.map(item => <Product key={item.id} product={item} onClickHandler={addToCartHandler}/>)}
          </div>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
