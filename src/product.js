import { useState } from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import CartSvg from './cartSvg';

function Product({ product, onClickHandler }) {

    const [isInCart, setIsInCart] = useState(false);

    return (<div className='product' id={product.id}> 
        <div>
        <Zoom>
            <img src={product.image} height={200} width={200} alt='' style={{borderRadius: "10px"}}/>
        </Zoom>
        </div>
        <h2>{product.name}</h2>
        <div>{product.description}</div>
        <div>{product.price} CZK</div>
        <div style={{
            width: "10%"
        }}>
        <div>
        <button className='buttonBuy'
        onClick={() => {
            setIsInCart(true);
            onClickHandler(product.name)
        }
        
        } >Koupit</button>
        </div>
        <div style={{display: "none"}}>
            V košíku
            <CartSvg width={20} height={20}/>
        </div>
        {/* <div>
            {isInCart && (() => {
                console.log("ahoj")
            })}
        
        </div> */}
        </div>
    </div>)
}

export default Product;