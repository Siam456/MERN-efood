import React , { useEffect, useState} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import './cart.css'

const Cart = () => {
    const { indexParams , id } = useParams();
    const [cartx, setcartx] = useState([]);

    const [quantity, setquantity] = useState(1);

    useEffect(async () => {
        const unmount = true;
        const res = await axios.get('/cart')
            .then(res => {
                if(unmount){
                    setcartx(res.data.cart);
                    //console.log(res.data.cart)

                    
                }
            })
            .catch(err => console.log(err))
        
        return () => {
            unmount = false;
        }
    }, [])


    const addCart = (seller_id,Product_id, totalPrice) => {

        const body = { 
            quantity,
            totalPrice
        }
        axios.post(`/cart/${seller_id}/${Product_id}`, body)
        .then(res => {
            console.log(res)
            window.location.href = "http://www.w3schools.com";
        })
        .catch(err => console.log(err))
    }

    //remove from cart
    const removeCart = (id) => {
        ///alert(id)

        axios.delete(`/cart/${id}`)
        .then(res => {
            window.location.reload();
        })
        .catch(err => console.log(err))
    }

    //add shopping item list

    const addShopping = (id) => {
        alert(id)
        axios.post(`/shoppingitem/${id}`)
        .then(res => {
            window.location.reload();
        })
        .catch(err => console.log(err))
    }
    
    return (
        <>
            <div className='container my-5'>
                <center>
                    <h1 className='my-5'>
                        <i className="fas fa-shopping-cart"></i> My Cart 
                    </h1>
                </center>
            </div>
            
            {cartx.map((value, index) => {

                let trackingOrder;
                if(value.products !== null){
                    trackingOrder = <div className="container cart">
                    <div className="row p-0 g-5">
                        <div
                            className="col-sm-6"
                            style={{ textAlign: "center", height: "100%", overflow: "hidden" }}
                        >
                            <img
                                style={{ marginBottom: "20px", borderRadius: "3px" }}
                                src={window.location.origin + `/productAvater/${value.products.avater}`}
                                height= '200px'
                            />
                        </div>
                        <div className="col-sm-6">
                            <h2 style={{ color: "gray" }}>
                                {" "}
                                <i className="fab fa-phoenix-framework"></i> {value.products.sellerA.shopname}
                            </h2>
                            <h4 className='head'>
                                {" "}
                                <i className="fas fa-map-marker-alt"></i> {value.products.sellerA.address}
                            </h4>
                            <h1>
                                {" "}
                                <i className="fas fa-pizza"></i> {value.products.title}
                            </h1>
                            <p className='text-muted' style={{wordWrap: 'break-word'}}>{value.products.description}</p>
                            <div style={{ marginBottom: "20px" }}>
                                <span
                                    className="text-primary font-weight-bold"
                                    style={{ marginRight: "20px" }}
                                >
                                    <i className="fas fa-sort-amount-up"></i> Quantity:
                                </span>

                                <span className="text-primary p-2 font-weight-bold"><b>{value.quantity}</b></span>
                            </div>
                            <h4>
                                <i className="fab fa-bitcoin"></i> tk {value.totalPrice}
                            </h4>
                            <div style={{ display: "flex" }}>
                                <button className="btn btn-secondary" onClick={()=> removeCart(value._id)}>
                                    <i style={{ color: "#2b2c2e" }} className="fas fa-minus-circle"></i> remove from Cart
                                </button>
                                <button className="btn btn-success" onClick={()=> addShopping(value._id)} style={{ marginLeft: "10px" }}>
                                    <i style={{ color: "#2b2c2e" }} className="fas fa-tags"></i> Check In
                                </button>
                            </div>
                        </div>;

                    </div>
                </div> 
                 
                }
                return(
                    <div key={index}>
                        {trackingOrder}
                    </div>)
                
            })}
            
        </>
    );
};

export default Cart;