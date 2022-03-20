import Image from 'next/image';
import React, { useState } from 'react'
import styles from '../styles/Navbar.module.css';
import { useSelector } from 'react-redux';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    const { quantity } = useSelector(state => state.cart);
  return (
    <nav className= {styles.container}>
        <div className={styles.logo}>
            <Link href="/" passHref>    
                <Image src='/img/logo.png' alt='logo' width={200} height={99} />
            </Link>
        </div>
        <ul className={styles.links}>
                <Link href="/" passHref>
                    <li className={styles.listItem}>Home</li>
                </Link>
                <li className={styles.listItem}>Products</li>
                <li className={styles.listItem}>Menu</li>
                <li className={styles.listItem}>Events</li>
                <li className={styles.listItem}>Blog</li>
                <li className={styles.listItem}>Contact</li>
        </ul>
        <div className={styles.right}>
            <div className={styles.order}>
                <div className={styles.phone}>
                    <Image src='/img/telephone.png' alt='phone' width={32} height={32} />
                </div>
                <div className={styles.details}>
                    <p>ORDER NOW!!!</p>
                    <a href="tel:+2347 08 559 7052">+2347 08 559 7052</a>
                </div>
            </div>
            <Link href="/cart" passHref>
                <div className={styles.carts}>
                    <div className={styles.cart}>
                        <Image src='/img/cart.png' alt='logo' width={30} height={30} />
                        <div className={styles.counter}>{ quantity }</div>
                    </div>
                </div>
            </Link>     
        </div>
        <div className={styles.menu}>
            <GiHamburgerMenu onClick={() => setToggle(true)}/>
            {toggle && (
                <motion.div
                    whileInView={{ x: [300, 0] }}
                    transition={{ duration: 0.85, ease: 'easeOut' }}
                    className = {styles.toggle}
                >
                    <HiX onClick={() => setToggle(false)}/>
                    <ul>
                        <Link href="/" passHref>
                            <li onClick={() => setToggle(false)}>Home</li>
                        </Link>
                        <li>Products</li>
                        <li>Menu</li>
                        <li>Events</li>
                        <li>Blog</li>
                        <li>Contact</li>
                        <li>
                            <div className={styles.order}>
                                <div className={styles.phone}>
                                    <Image src='/img/telephone.png' alt='phone' width={32} height={32} />
                                </div>
                                <div className={styles.details}>
                                    <p>ORDER NOW!!!</p>
                                    <a href="tel:+2347 08 559 7052" onClick={() => setToggle(false)}>+2347 08 559 7052</a>
                                </div>
                             </div>
                        </li>
                        
                            <li>
                                <Link href="/cart" passHref >
                                    <div className={styles.carts} onClick = {() => setToggle(false)} >
                                        <div className={styles.cart}>
                                            <Image src='/img/cart.png' alt='logo' width={45} height={45} />
                                            <div className={styles.counter}>{ quantity }</div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        
                    </ul>

                </motion.div>
            )}
        </div>
    </nav>
  )
}

export default Navbar