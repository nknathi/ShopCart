// type definition for a functional component in React.
import { FunctionComponent } from 'react';

// This hook is used for programmatic navigation in a React application
import { useNavigate } from 'react-router-dom';

// imports an SVG image of a shopping cart from a local file.
import shoppingCart from '../../assets/shopping-cart.svg';

// import styles for the component using CSS modules.
import classes from './cartwidget.module.scss'


/*
    Interface named Props is defined with a single property productsCount of type number. 
    This interface specifies the expected prop types for the CartWidget component.
*/
interface Props {
    productsCount: number
}

// CartWidget component is declared as a functional component
//  receives the productsCount prop from its parent component
export const CartWidget: FunctionComponent<Props> = ({ productsCount }) => {

    // useNavigate hook is used to get the navigate function, 
    // which can be used to programmatically navigate to different routes in the application.
    const navigate = useNavigate();

    // callback function called navigateToCart
    //
    const navigateToCart = () => {
        // It uses the navigate function to redirect the user to the '/cart' route when the button is clicked.
        navigate('/cart');
    }

    // component returns JSX, which represents the shopping cart widget
    return (
        <button className={classes.container} onClick={navigateToCart}>
            // This displays the productsCount prop, indicating the number of items in the shopping cart.
            <span className={classes.productsCount}>{productsCount}</span>
            // This displays the shopping cart icon from the imported SVG file
            <img src={shoppingCart} className={classes.shoppingCart} alt="Go to Cart " />
        </button>
    );
}