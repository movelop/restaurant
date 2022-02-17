import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mo Pizza</title>
        <meta name="description" content="Get the best pizza in Ota at the best Price" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      HomePage
      <img src='/img/logo.png' alt='logo' />
    </div>
  )
}
