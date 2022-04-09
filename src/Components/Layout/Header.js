// import React from 'react';
import { Fragment } from "react";
import classes from "./Header.module.css";

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Eggciting</h1>
                <button>Cart</button>
            </header>
            <div className={classes['main-image']}>
                <img src = "https://images.pexels.com/photos/4397266/pexels-photo-4397266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt = "A TAble full of delicious food! " />
            </div>
        </Fragment>
    );
};

export default Header;
