import { FunctionComponent } from "react";
import { CurrencyFormatter } from "../CurrencyFormatter";
import classes from './totalprice.module.scss';

interface Props {
    amount: number
}

export const TotalPrice: FunctionComponent<Props> = ({ amount }) => {
    return <div className={classes.totalPrice}>Total: {<CurrencyFormatter amount={amount} />}</div>
}