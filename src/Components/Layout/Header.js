import { Fragment } from "react";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import HeaderImage from "../../Assets/HeaderImage.jpg";
import MealsSummary from "../Meals/MealsSummary";

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <div className={classes.name}>
                    <h2 className={classes['app-name']}>E</h2>
                    <h2 className={classes['name-gg-style']}>gg</h2>
                    <h2 className={classes['app-name']}>citing</h2>
                    </div>  
                <HeaderCartButton onClick = {props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src = {HeaderImage}
                alt = "A Table full of delicious food! " />
                {/* <MealsSummary /> */}
            </div>
        </Fragment>
    );
};

export default Header;
