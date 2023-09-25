// imports
import  { FunctionComponent, useEffect } from 'react';
// routing purposes
import { Link } from 'react-router-dom';
// managing local storage state
import useLocalStorageState from 'use-local-storage-state';

import logo from '/logo.svg';
// imports styles
import classes from './header.module.scss'; 

// import custom components
import { CartWidget } from '../CartWidget';
import { CartProps } from '../Products/Products.tsx';

// Header component is defined as a functional component that takes no props
export const Header : FunctionComponent = () => {
    // a useEffect hook
    useEffect(() => {
        // adds an event listener for the "scroll" event on the window object when the component is mounted
        // event listener calls the shrinkHeader function when scrolling occurs
        window.addEventListener("scroll", () => shrinkHeader(), false)

        return () => {
            window.removeEventListener("scroll", () => shrinkHeader())
        }
    }, [])

    // shrinkHeader function is responsible for changing the visual appearance of the header based on the scroll position.
    const shrinkHeader = () => {
        const DISTANCE_FROM_TOP = 140;
        const headerElement = document.querySelector("header") as HTMLElement;
        const logoElement = document.querySelectorAll("img")[0] as HTMLElement;
        const cartWidgetElement = document.querySelectorAll("img")[1] as HTMLElement;
        const productsCountElement = document.querySelector("span") as HTMLElement;
        const scrollY = document.body.scrollTop || document.documentElement.scrollTop

        // It checks the scroll position (scrollY) and, 
        // if it's greater than a certain distance from the top (DISTANCE_FROM_TOP)
        if (scrollY > DISTANCE_FROM_TOP) {
            // it applies CSS transitions and style changes to shrink the header, logo, cart widget, and products count.
            headerElement.style.transition = "height 200ms ease-in";
            headerElement.style.height = "80px"
            logoElement.style.transition = "height 200ms ease-in";
            logoElement.style.height = "4rem";
            cartWidgetElement.style.transition = "height 200ms ease-in";
            cartWidgetElement.style.height = "2rem";
            productsCountElement.style.transition = "font-size 200ms ease-in";
            productsCountElement.style.fontSize = "1.5em";
        }
        // If the scroll position is less than the defined distance, it reverts the styles to their original state.
         else 
        {
            headerElement.style.height = "150px";
            logoElement.style.height = "6rem";
            cartWidgetElement.style.height = "3rem";
            productsCountElement.style.fontSize = "1.5em"
        }
    }

    // The component uses the useLocalStorageState hook to manage a piece of local storage state called cart
    const [cart, ] = useLocalStorageState<CartProps>('cart', {});

    // The number of products in the cart is calculated by counting the keys in the cart object using Object.keys(cart || {}).length. 
    // This value is stored in the productsCount variable.
    const productsCount: number = Object.keys(cart || {}).length;
    
    // The component returns JSX code that defines the header structure
    return (
        // It applies CSS classes from the imported CSS module (header.module.scss) using className.
        <header className={classes.header}>
            <div>
                // The header contains a link to the home page with an image logo and a CartWidget component that displays the number of products in the cart
                <Link to="/">
                    <img src={logo} className={classes.logo} alt="Shopping Cart Application" />
                </Link>
            </div>
            <div>
                <CartWidget productsCount={productsCount} />
            </div>
        </header>
    );
}