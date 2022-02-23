import styles from '../styles/Cart.module.css';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import NumberFormat from "react-number-format";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const Cart = () => {
    const [open, setOpen] = useState(false);
    const amount = "2";
    const currency = "USD";
    const style = {"layout":"vertical"};
    const cart = useSelector(state=> state.cart);

    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    
        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);
    
    
        return (<>
                { (showSpinner && isPending) && <div className="spinner" /> }
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function () {
                            // Your code here after capture the order
                        });
                    }}
                />
            </>
        );
    };

  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.trTitle}>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Extras</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.products?.map(product => (
                        <tr className={styles.tr} key={product._id}>
                        <td>
                          <div className={styles.imgContainer}>
                            <Image
                              src={product.img}
                              layout="fill"
                              objectFit="cover"
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <span className={styles.name}>{product.title}</span>
                        </td>
                        <td>
                          <span className={styles.extras}>
                            {product.extras.map((extra) => (
                              <span key={extra._id}>{extra.text}, </span>
                            ))}
                          </span>
                        </td>
                        <td>
                            {/* <span className={styles.price}>${product.price}</span> */}
                            <NumberFormat
                                value={product.price}
                                className={styles.price}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'N'}
                                renderText={(value, props) => <span {...props}>{value}</span>}
                            />
                        </td>
                        <td>
                          <span className={styles.quantity}>{product.quantity}</span>
                        </td>
                        <td>
                            <NumberFormat
                                value={product.price * product.quantity}
                                className={styles.total}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'N'}
                                renderText={(value, props) => <span {...props}>{value}</span>}
                            />
                        </td>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className={styles.right}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>CART TOTAL</h2>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Subtotal:</b>
                    <NumberFormat
                        value={cart.total}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"N"}
                    />
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Discount:</b>
                    <NumberFormat
                        value={0}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"N"}
                    />
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Total:</b>
                    <NumberFormat
                        value={cart.total}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"N"}
                    />
                </div>
                {open? (
                    <div className={styles.paymentMethods}>
                        <button className={styles.payButton}>Pay On Delivery</button>
                        <PayPalScriptProvider
                            options={{
                                "client-id": "test",
                                components: "buttons",
                                currency: "USD",
                                "disable-funding": "credit,card,p24",
                            
                            }}  
                        >
                            <ButtonWrapper
                                currency={currency}
                                showSpinner={false}
                            />
                        </PayPalScriptProvider>
                    </div>
                ) : (
                    <button onClick={() => setOpen(true)} className={styles.button}>
                        CHECKOUT NOW!
                    </button>
                )}
                
                
            </div>
        </div>
    </div>
  )
}

export default Cart