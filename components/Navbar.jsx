import Image from 'next/image';
import React from 'react'
import styles from '../styles/Navbar.module.css';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Navbar = () => {
    const { quantity } = useSelector(state => state.cart);
  return (
    <div className= {styles.container}>
        <div className={styles.item}>
            <div className={styles.callButton}>
                <Image src='/img/telephone.png' alt='phone' width={32} height={32} />
            </div>
            <div className={styles.texts}>
                <div className={styles.text}>ORDER NOW!!!</div>
                <div className={styles.text}><a href="tel:+2347 08 559 7052">+2347 08 559 7052</a></div>
            </div>
        </div>
        <div className={styles.item}>
            <ul className={styles.list}>
                <Link href="/" passHref>
                    <li className={styles.listItem}>Home</li>
                </Link>
                <li className={styles.listItem}>Products</li>
                <li className={styles.listItem}>Menu</li>
                <Image src='/img/logo.png' alt='logo' width={200} height={99} />
                <li className={styles.listItem}>Events</li>
                <li className={styles.listItem}>Blog</li>
                <li className={styles.listItem}>Contact</li>
            </ul>
        </div>
        <Link href="/cart" passHref>
            <div className={styles.item}>
                <div className={styles.cart}>
                    <Image src='/img/cart.png' alt='logo' width={30} height={30} />
                    <div className={styles.counter}>{ quantity }</div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Navbar