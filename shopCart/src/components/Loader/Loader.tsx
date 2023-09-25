// used to define a functional component's type.
import { FunctionComponent } from 'react';
// importing styles
import classes from './loader.module.scss';

// Loader is a functional component that takes no prop
export const Loader:FunctionComponent = () => (
    // it renders a <div> element with a class name of classes.loader. 
    <div className={classes.loader}>
        <div className={classes.spinner}></div>
    </div>
)