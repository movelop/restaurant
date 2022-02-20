import Head from 'next/head';
import Footer from './Footer';
import Navbar from './Navbar';


const Layout = ({ children }) => {
  return (
    <div>
        <Head>
            <title>Mo Pizza</title>
            <meta name="description" content="Get the best pizza in Ota at the best Price" />
            <link rel="icon" href="/favicon.png" />
        </Head>
        <Navbar />
        { children}
        <Footer />
    </div>
  )
}

export default Layout