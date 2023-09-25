// FunctionComponent from the "react" library, which is used to define a functional component in React
import { FunctionComponent  } from "react";
// currencyformatter.module.scss" and assigns it to the variable classes
import classes from './currencyformatter.module.scss';

// interface named Props is defined. It specifies the expected prop(s) for the CurrencyFormatter component.
// In this case, it defines a single prop called amount of type number.
interface Props {
    amount: number
}

// CurrencyFormatter component is defined as a functional component
// It takes in the Props interface as a generic type, specifying that it expects the amount prop.
export const CurrencyFormatter: FunctionComponent<Props> = ({ amount }) => {
    // it calculates the formattedAmount by using the toLocaleString method
    const formattedAmount = amount.toLocaleString('en-GB', {
        style: 'currency',
        currency: 'GBP'
    })

    // returns a <span> element with a className of currency that displays the formattedAmount.
    return <span className={classes.currency}>{formattedAmount}</span>
}
