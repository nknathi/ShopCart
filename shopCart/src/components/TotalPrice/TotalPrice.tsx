// used for functional components in React
import { FunctionComponent } from "react";
// custom module or component responsible for formatting currency values
import { CurrencyFormatter } from "../CurrencyFormatter";
// styles
import classes from './totalprice.module.scss';

// pecifies the expected props for the TotalPrice component. 
// it expects a single prop named amount of type number.
interface Props {
    amount: number
}

// defined as a functional component. It receives the amount prop from its parent component.
export const TotalPrice: FunctionComponent<Props> = ({ amount }) => {
    // a <div> element is rendered with a CSS class applied using className={classes.totalPrice}
    // component <CurrencyFormatter /> is also included within the <div>
    // It is passed the amount prop as a prop value. 
    // The use of curly braces {} suggests that it is expected to be a React component
    return <div className={classes.totalPrice}>Total: {<CurrencyFormatter amount={amount} />}</div>
}