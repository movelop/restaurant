import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react';
import NumberFormat from 'react-number-format';
import styles from '../../styles/Admin.module.css'

const Index = ({ orders, products }) => {
    const [pizzaList, setPizzaList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ["preparing", "on the way", "at location", 'delivered'];

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const res = await axios.delete(`https://restaurant-dun-phi.vercel.app/api/products/${id}`);
            setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const handleStatus = async (id) => {
        const item = orderList.filter((order) => order._id === id)[0];
        const currentStatus = item.status;
    
        try {
          const res = await axios.put("https://restaurant-dun-phi.vercel.app/api/orders/" + id, {
            status: currentStatus + 1,
          });
          setOrderList([
            res.data,
            ...orderList.filter((order) => order._id !== id),
          ]);
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <div className={styles.container}>
        <div className={styles.item}>
            <h1 className={styles.title}>Products</h1>
            <table className={styles.table}>
                <thead>
                <tr className={styles.trTitle}>
                    <th>Image</th>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {pizzaList.map((product) => (
                        <tr className={styles.tr} key= {product._id}>
                            <td>
                                <div className={styles.imgContainer}>
                                    <Image
                                    src={product.img}
                                    width={50}
                                    height= {50}
                                    objectFit="cover"
                                    alt=""
                                    />
                                </div>
                            </td>
                            <td>{product._id.slice(0, 5)} ...</td>
                            <td>{product.title}</td>
                            <td>
                            <NumberFormat
                                value={product.prices[0]}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                                renderText={(value, props) => <span {...props}>{value}</span>}
                            />
                            </td>
                            <td>
                                <button className={styles.button}>Edit</button>
                                <button
                                    className={styles.button}
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
        <div className={styles.item}>
            <h1 className={styles.title}>Orders</h1>
            <table className={`${styles.table}, ${styles.table2}`}>
                <thead>
                    <tr className={styles.trTitle2}>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map((order) => (
                        <tr className={styles.tr} key={order._id}>
                            <td className={styles.id}>{order._id.slice(0, 5)}...</td>
                            <td className={styles.customer}>{order.customer}</td>
                            <td>
                                <NumberFormat
                                    value={order.total}
                                    className={styles.total}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    renderText={(value, props) => <span {...props}>{value}</span>}
                                />
                            </td>
                            <td className={styles.method}>
                                {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                            </td>
                            <td className={styles.status}>{status[order.status]}</td>
                            <td className={styles.action}>
                                <button onClick={() => handleStatus(order._id)}>
                                    Next Stage
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";

    if(myCookie.token !== process.env.TOKEN ){
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            }
        }
    }
    
    const productRes = await axios.get("https://restaurant-dun-phi.vercel.app/api/products");
    const orderRes = await axios.get("https://restaurant-dun-phi.vercel.app/api/orders");
  
    return {
      props: {
        orders: orderRes.data,
        products: productRes.data,
      },
    };
};

export default Index