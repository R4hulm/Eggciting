import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim()==='';
const isPinCode = value => value.trim().length === 6; 

const Checkout = (props) => {
    const [formInputsValidity, setformInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        pinCode: true,
    });
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const pinCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPinCode = pinCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreeteIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPinCodeIsValid = isPinCode(enteredPinCode) && !isNaN(enteredPinCode);

        setformInputsValidity({
            name:enteredCityIsValid,
            street:enteredStreeteIsValid,
            city:enteredCityIsValid,
            pinCode:enteredPinCodeIsValid
        })
        const isFormValid = enteredNameIsValid && 
            enteredStreeteIsValid && 
            enteredCityIsValid && 
            enteredPinCodeIsValid;

        if(!isFormValid){
            return;
        }
        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            pinCode:enteredPinCode
        });
    };

    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;
    const pinCodeControlClasses = `${classes.control} ${formInputsValidity.pinCode ? '' : classes.invalid}`;
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef}/>
                {!formInputsValidity.name && <p>Please enter valid name!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
                {!formInputsValidity.street && <p>Please enter valid street! </p>}
            </div>
            <div className={cityControlClasses} >
                <label htmlFor='city'>City</label>
                <input type='text' id= 'city' ref={cityInputRef}/>
                {!formInputsValidity.city && <p>Please enter valid city</p>}
            </div>
            <div className={pinCodeControlClasses}>
                <label htmlFor='pincode'>Pin Code</label>
                <input type='text' id='pincode'ref={pinCodeInputRef}/>
                {!formInputsValidity.pinCode && <p>Please enter valid 6 digit Pin Code</p>}
            </div>
            
            <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>
                Cancel
                </button>
            <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;