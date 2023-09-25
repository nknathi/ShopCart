// creating React functional components and managing component state
import { FunctionComponent, useState  } from "react";
// importing styles
import classes from './quantifier.module.scss';

// defines a custom type Operation, which can have two values: 'decrease' or 'increase'.
// It is used to specify the operation to be performed when the user clicks the buttons.
export type Operation = 'decrease' | 'increase';

// defines the component's prop types
interface Props {
    // callback function that takes a productId as a parameter and is used to remove the product
    removeProductCallback: (productId: number) => void
    // callback function that takes a productId and an operation (either 'decrease' or 'increase') as parameters and is used to update the product quantity.
    handleUpdateQuantity: (productId: number, operation: Operation) => void
    // unique identifier for the product associated with this quantity input.
    productId: number
}

// functional component named Quantifier that takes the defined Props as its props.
// Inside the component, the props are destructured to access removeProductCallback, handleUpdateQuantity, and productId.
export const Quantifier: FunctionComponent<Props> = ({ removeProductCallback, handleUpdateQuantity, productId }) => {
    // initializes a state variable value using the useState hook.
    // It starts with a default value of 1 and is used to store the quantity.
    const [value, setValue] = useState<number>(1);

    // defined as click handlers for the '-' 
    const reduce = ():void => {
        // functions call handleUpdateQuantity with the productId and the corresponding operation 'decrease'
        handleUpdateQuantity(productId, 'decrease');

        // update the value state accordingly.
        setValue(prevState => {
            const updateValue = prevState - 1;

            if (updateValue === 0) {
                removeProductCallback(productId);
            }
            return updateValue;
        })
    }

    // defined as click handlers for the '+' 
    const increase = ():void => {
        // functions call handleUpdateQuantity with the productId and the corresponding operation 'increase'
        handleUpdateQuantity(productId, 'increase');
        // update the value state accordingly.
        setValue(prevState => prevState + 1)
    }

    // defines the JSX structure to render the quantity input and buttons
    return (
        <div className={classes.quantifier}>
            // button to decrease the quantity
            <input type="button" value="-" className={classes.buttonMinus} onClick={reduce} />
            // display and edit the quantity
            <input type="number" step="1" max="" value={value} onChange={e => setValue(parseInt(e.target.value))}
            className={classes.quantityField} />
            // button to increase the quantity
            <input type="button" value="+" className={classes.buttonPlus} onClick={increase} />
        </div>
    )
}
