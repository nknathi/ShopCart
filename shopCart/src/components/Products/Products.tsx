// used in React to define functional components and manage component side effects and state.
import { FunctionComponent, useEffect, useState } from "react";
// used for managing local storage in your React application.
import useLocalStorageState from "use-local-storage-state";

// component or utility function named CurrencyFormatter
import { CurrencyFormatter } from '../CurrencyFormatter';
// import styles
import classes from './products.module.scss';
// component is used to display loading animations or indicators.
import { Loader } from '../Loader/Loader';

// stores the URL for an API endpoint
const API_URL = 'https://dummyjson.com/products';

// interface or type definition that describes the structure of a product object
// includes properties like id, title, price, thumbnail, image, and quantity
export type Product = {
    id: number,
    title: string,
    price: number,
    thumbnail: string,
    image: string,
    quantity: number
}

export interface CartProps {
    [productId: string]: Product
}

// The Products component is defined as a functional component using React's FunctionComponent
export const Products: FunctionComponent = () => {
    // uses React state hooks (useState) to manage several pieces of state
    // boolean state variable indicating whether data is currently being loaded.
    const [isLoading, setIsLoading] = useState(true);
    // array of Product objects representing the list of products fetched from an API.
    const [products, setProducts] = useState<Product[]>([]);
    // boolean state variable indicating whether an error occurred during data fetching.
    const [error, setError] = useState(false);
    // state variable is managed using a custom hook called useLocalStorageState, and it represents the items in the shopping cart.
    // It's initialized with an empty object {}.
    const [cart, setCart] = useLocalStorageState<CartProps>('cart', {});

    // useEffect hook is used to fetch data from an API when the component mounts (i.e., when it is first rendered)
    useEffect(() => {
        // uses the fetchData function to make an asynchronous request to an API_URL
        fetchData(API_URL);
    }, [])

    // asynchronous function is responsible for fetching data from the specified URL.
    // It uses fetch and handles both success and error scenarios by setting the products, isLoading, and error state accordingly.
    async function fetchData(url: string) {
        try {
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();

                setProducts(data.products);
                setIsLoading(false);
            } else {
                setError(true);
                setIsLoading(false);
            }
        } catch (error) {
            setError(true);
            setIsLoading(false);
        }
    }

    // function is called when the "Add to Cart" button is clicked.
    // It takes a Product object as an argument and adds it to the cart state
    const addToCart = (product: Product):void => {
        // sets the quantity of the product to 1 and updates the cart state with the new product.
        product.quantity = 1;

        setCart((prevCart) => ({
            ...prevCart,
            [product.id]: product,
        }));
    }

    // function checks whether a product with a given productId is already in the cart. 
    // It converts the cart object into an array of keys (product ids) and checks if the productId is included in that array.
    const isInCart = (productId: number):boolean => Object.keys(cart || {}).includes(productId.toString());

    // If there is an error (error is true), it renders an error message.
    if(error) {
        return <h3 className={classes.error}>An error occurred when fetching data. Please check the API and try again.</h3>
    }

    // If data is still loading (isLoading is true), it renders a loader component.
    if (isLoading) {
        return <Loader/>
    }

    // it renders the list of products obtained from the API.
    // It maps through the products array, rendering each product's details along with an "Add to Cart" button.
    // The button is disabled if the product is already in the cart
    return (
        <section className={classes.product}>
            <h1>Products</h1>

            <div className={classes.container}>
                {products.map(product => (
                    <div className={classes.product} key={product.id}>
                        <img src={product.thumbnail} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>Price: <CurrencyFormatter amount={product.price} /></p>
                        <button disabled={isInCart(product.id)} onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </section>
    );
}