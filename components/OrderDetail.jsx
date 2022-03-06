import { useState } from 'react'
import styles from '../styles/OrderDetail.module.css'

const OrderDetail = ({ total, createOrder, setCash }) => {
    const [customer, setCustomer] = useState('');
    const [address, setAddress] = useState('');

    const handleClick = () => {
        createOrder({ customer, address, total, method: 0})
    }
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <div className={styles.cancel} onClick = { () => setCash(false) }>X</div>
            <h1 className={styles.title}> You will pay ${total} after delivery </h1>
            <div className={styles.item}>
                <label className={styles.label}>Full Name</label>
                <input 
                    type ="text" 
                    placeholder ='John Doe'
                    className ={styles.input}
                    onChange = { (e) => setCustomer(e.target.value) }
                />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Phone Number</label>
                <input 
                    type="tel"
                    placeholder='+2347 08 559 7052'
                    className={styles.input}
                />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Address</label>
                <textarea
                    rows={5}
                    placeholder="Elton St. 505 NY"
                    type="text"
                    className={styles.textarea}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <button className={styles.button} onClick={handleClick}>
                Order
            </button>
        </div>
    </div>
  )
}

export default OrderDetail