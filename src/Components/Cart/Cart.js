import { useContext, useState } from 'react';
import Modal from '../UserInterface/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/CartContext';
import Checkout from './Checkout';


const Cart = (props) => {
    const [isCheckOut,setIsCheckOut] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length>0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item,amount:1});
    };

    const orderHandler = () => {
        setIsCheckOut(true);
    };

    const submitOrderhandler = (userData) => {
        fetch('https://eggciting-63c92-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
        body:JSON.stringify({
            user: userData,
            orderedItems:cartCtx.items,
            })
        });
    };

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>
            Close
            </button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>);

    const cartItems = (
        <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (
            <CartItem 
            key={item.id} 
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
            />
        ))}
    </ul>
    );

    return ( 
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckOut && <Checkout onConfirm={submitOrderhandler} onCancel={props.onClose}/>}
            {!isCheckOut && modalActions}
        </Modal>
    );
};

export default Cart;