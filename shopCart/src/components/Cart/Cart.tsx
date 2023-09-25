
// used for defining functional components in React
import { FunctionComponent, useEffect } from "react";

// custom hook, used to manage state in a React component
import useLocalStorageState from "use-local-storage-state";

// Custom Component Imports
import { Quantifier } from '../Quantifier'
import { CartProps, Products } from '../Products/Products.tsx';
import { TotalPrice } from '../TotalPrice';
import { Operation } from '../Quantifier/Quantifier.tsx';

// imports CSS module classes from a stylesheet file
import classes from './cart.module.scss';

// imports the useLocation hook from the "react-router-dom" library
import { useLocation } from "react-router-dom";


// defines a functional component named Cart
export const Cart: FunctionComponent = () => {

    // This line declares a variable named cart and a function named setCart using destructuring assignment.
    // It uses a custom hook called useLocalStorageState. 
    // <CartProps> specifies the type of data that will be stored in local storage
    // 'cart' is the key under which the cart data will be stored in local storage. 
    // This key is used to retrieve and update the cart data.
    // {} is the initial value of the cart, which is an empty object. 
    const [cart, setCart] = useLocalStorageState<CartProps>('cart', {});

    // This line declares a variable named location and assigns it the value returned by the useLocation hook.
    // This hook is likely used for accessing the current URL location in the application.
    const location = useLocation();

    // This is a useEffect hook.
    // It specifies a function that will be executed as a side effect when the location variable changes.
    // The function uses window.scrollTo(0, 0); to scroll the window to the top,
    // ensuring that the page starts at the top when the location changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location])

    // This function removes a product from the cart by updating the cart state.
    // Defines a function named handleRemoveProduct that takes a productId as an argument and returns void
    const handleRemoveProduct = (productId: number): void => {
        // the setCart function to update the cart state. 
        // It takes the previous cart state (prevCart) as an argument and returns a new cart state.
        setCart((prevCart) => {

            // Creates a copy of the previous cart using { ...prevCart },
            // and then it deletes the entry with the specified productId from the copied cart using delete updatedCart[productId].
            const updatedCart = { ...prevCart };
            delete updatedCart[productId];
            return updatedCart;
        })
    }


    // Defines a function named handleUpdateQuantity, which takes two parameters:
    // productId, a number representing the ID of the product to update,
    // operation, which appears to be an enumerated type or string indicating whether
    // to "increase" or "decrease" the quantity of the product.
    const handleUpdateQuantity = (productId: number, operation: Operation) => {

        // This line uses a functional update approach with the setCart function
        // takes the previous state of the cart as an argument (denoted as prevCart) and returns the updated state
        setCart((prevCart) => {

            // This line creates a shallow copy of the previous cart state to ensure that you don't directly mutate the previous state
            // This is done using the spread operator ({ ...prevCart }),
            // which creates a new object with the same properties and values as the previous cart.
            const updatedCart = { ...prevCart };


            //  This condition checks whether the product with the specified productId exists in the updatedCart
            if (updatedCart[productId]) {
                //If the operation is "increase," it increments the quantity of the product in the updatedCart by 1.
                if (operation === 'increase') {
                    updatedCart[productId] = { ...updatedCart[productId], quantity: updatedCart[productId].quantity + 1 };
                } else {
                    updatedCart[productId] = { ...updatedCart[productId], quantity: updatedCart[productId].quantity - 1 };
                }
            }
            return updatedCart;
        })
    }
    
    // getProducts is a constant (variable that cannot be reassigned) declared as an arrow function.
    // This function retrieves the products from a cart object and returns them as an array.
    // Object.values(cart || {}) is used to extract the values (products) from the cart object as an array.
    const getProducts = () => Object.values(cart || {});


    // getProducts() is called to retrieve the array of products from the cart using the getProducts function defined earlier.
    // .reduce() is a method applied to the array of products. 
    // It is used to accumulate a single value (in this case, the total price) by iterating through the products
    // (accumulator, product) => accumulator + (product.price * product.quantity) is the callback function passed to reduce. 
    const totalPrice = getProducts().reduce((accumulator, product) => accumulator + (product.price * product.quantity), 0);

    return (
        // defines a React component that appears to represent a "Cart" section in a web application.
        // <section> element that serves as a container for the cart content.
        <section className={classes.cart}>
            <h1>Cart</h1>

            <div className={classes.container}>
                /*  the component is dynamically rendering a list of products. 
                    It uses the map function to iterate over the products returned by the getProducts() function and generates a block of JSX for each product.
                */
                {getProducts().map(product => (
                    // For each product, it creates a <div> element with the class name product.
                    <div className={classes.product} key={product.id}>

                        // img element is used to display the product's thumbnail image.
                        <img src={product.thumbnail} alt={product.title} />

                        // h3 element displays the product's title.
                        <h3>{product.title}</h3>

                        // renders a Quantifier component, passing in several prop 
                        // removeProductCallback: A function that likely removes the product from the cart when invoked.
                        // productId: The ID of the product
                        // handleUpdateQuantity: A function that handles updating the quantity of the product.
                        <Quantifier removeProductCallback={() => handleRemoveProduct(product.id)} productId={product.id} handleUpdateQuantity={handleUpdateQuantity} />
                    </div>
                ))}
            </div>

            // rendering the list of products, it includes a TotalPrice component, passing in an amount prop with the totalPrice value.
            <TotalPrice amount={totalPrice} />
        </section>
    );
}