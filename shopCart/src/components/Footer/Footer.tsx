// FunctionComponent type from the "react" library. This type is used to define a functional component.
import { FunctionComponent } from "react";
// import styles
import classes from "./footer.module.scss";
// imports the contents of the "package.json" file
// used to retrieve information about the project, such as its name and version.
import packageJson from '../../../package.json';

// functional component named Footer
// It is of type FunctionComponent, which means it's a React functional component that takes no props.
export const Footer: FunctionComponent = () => {
    // It calculates the current year using JavaScript's Date object. 
    const currentYear = new Date().getFullYear();

    // This function returns JSX code that defines the structure and content of the Footer component.
    return (
        <footer className={classes.footer} data-cy="footer">
            <ul>
                <li className={classes.footerLinks}>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" data-cy="twitterLink">
                        twitter
                    </a>{" "}
                    &bull;{" "}
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" data-cy="githubLink">
                        github
                    </a>
                </li>
                <li className={classes.footerCopyrights}>
                    {packageJson.name} {currentYear}. All rights reserved.
                </li>
                <li>
                    <div className={classes.version}>v.{packageJson.version}</div>
                </li>
            </ul>
        </footer>
    );
}