import { useState } from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

function Product({ product, onClickHandler }) {

    const [isInCart, setIsInCart] = useState(false);

    return (<div style={{
        width: "100%",
        border: "1px solid black",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        margin: "5px",
        padding: "5px"
    }}>
        <h2>{product.name}</h2>
        <div>
        <Zoom>
            <img src={product.image} height={100} width={100} alt=''/>
        </Zoom>
        </div>
        <div>{product.description}</div>
        <div>{product.price} CZK</div>
        <div style={{
            width: "10%"
        }}>
        <button
        onClick={() => {
            setIsInCart(true);
            onClickHandler(product.name)
        }

        } >Buy</button>
        <div>{isInCart && "V košíku"}</div>
        </div>
    </div>)
}

export default Product;