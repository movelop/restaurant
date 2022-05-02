import axios from 'axios'
import { useState } from 'react'
import Add from '../components/Add'
import AddButton from '../components/AddButton'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import styles from '../styles/Home.module.css'

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true)
  return (
    <div className={styles.container}>
      <Featured />
      { admin && <AddButton setClose = {setClose} />}
      <PizzaList pizzaList = { pizzaList } />
      { !close && <Add setClose = {setClose} /> }
    </div>
  )
}


export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if(myCookie.token === process.env.TOKEN) {
    admin = true
  }

  const res = await axios.get('/api/products');
  return {
    props: {
      pizzaList : res.data,
      admin
    }
  }
}