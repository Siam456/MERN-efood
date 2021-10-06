import React , { useEffect, useState} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import './OrderItem.css'

const OrderItem = () => {
    const { indexParams , id } = useParams();
    const [cartx, setcartx] = useState([]);

    const [quantity, setquantity] = useState(1);

    useEffect(() => {
        axios.get('shoppingitem/shop')
            .then(res => {
                //if(unmount){
                    setcartx(res.data.shoppingItem);
                    //console.log(res.data.shoppingItem)

                    
                //}
            })
            .catch(err => console.log(err))
        
        return () => {
            
        }
    }, [])

    
    const cacelOrder = (id) => {
        axios.delete(`/shoppingitem/${id}`)
        .then(res => {
            window.location.reload();
        })
        .catch(err => console.log(err))
    }

    const changeStatus = (id) => {
        //alert(id)
        let body = {
            status: "pickup"
        }

        axios.put(`/shoppingitem/${id}`, body)
        .then(res => {
            if(res){
                alert('ok done')
                window.location.reload();
            }
        })
        .catch(err => {
            alert('Server site problem')
        })
    }

    
    return (
        <>
            <div className='container my-5'>
                <center>
                    <h1 className='my-5'>
                        <i className="fas fa-route"></i> Ordered Item
                    </h1>
                </center>
            </div>
            
            {cartx.map((value, index) => {

                let rider;
                let buttonpick;
                if(value.rider){
                    rider = <div className='deliveryInfo'>
                    <h4>Rider Info</h4>
                    <i className="fas fa-user-alt"></i>
                    <span> User Name:  </span> 
                    {value.rider.name} <br></br>
                    <i className="fas fa-location"></i>
                    <span> Location:  </span> 
                    {value.rider.address} <br></br>
                    <i className="fas fa-phone-alt"></i>
                    <span> Phone:  </span> 
                    {value.rider.phone} <br></br>
                    
                </div>
                } else{
                    buttonpick = <button style={{marginLeft: '10px'}} className="btn btn-warning" onClick={() => changeStatus(value._id)}>
                    <i style={{ color: "#2b2c2e" }} className="fas fa-shipping-fast"></i> Shipping
                </button>
                }

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
                            
                            <div className='trackingId'>
                                <i className="fas fa-truck-loading"></i>
                                <span> Tracking Id:  </span> 
                                {value._id} <br></br>
                                
                            </div>

                            <div className='deliveryInfo'>
                                <h4>Order Location Info</h4>
                                <i className="fas fa-user-alt"></i>
                                <span> User Name:  </span> 
                                {value.user.name} <br></br>
                                <i className="fas fa-location"></i>
                                <span> Location:  </span> 
                                {value.user.address} <br></br>
                                <i className="fas fa-phone-alt"></i>
                                <span> Phone:  </span> 
                                {value.user.phone} <br></br>
                                
                            </div>

                            {rider}

                            <div style={{margin: '40px'}}>
                                
                                <span> status:  </span> 
                                <i className="fas fa-people-carry"></i>
                                {value.status} <br></br>
                                {value.status === 'Preparing' ? 
                                <div>
                                    <i className="fas fa-people-carry"></i>
                                    kaj korte hbe
                                </div>
                                 : 'notsiam'}
                            </div>


                            <h4>
                                <i className="fab fa-bitcoin"></i> tk {value.totalPrice}
                            </h4>
                            <div style={{ display: "flex", marginTop: '20px'}}>
                                <button className="btn btn-secondary" onClick={() => cacelOrder(value._id)}>
                                    <i style={{ color: "#2b2c2e" }} className="fas fa-minus-circle"></i> Cancel Order
                                </button>

                                
                                {buttonpick}
                                
                            </div>
                        </div>;

                    </div>
                </div> 
                 
                }

                
                return(
                    <>
                        {trackingOrder}
                    </>)
                
            })}
            
        </>
    );
};

export default OrderItem;