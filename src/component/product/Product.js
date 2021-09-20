import React , { useEffect, useState} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import './product.css'

const Product = (param) => {
    const { indexParams , id } = useParams();
    const [product, setproduct] = useState([]);

    const [quantity, setquantity] = useState(1);

    useEffect(() => {
        axios.get('/user/seller')
            .then(res => {
                //if(unmount){
                    setproduct(res.data.seller);
                    //console.log(param.user.role)

                    
                //}
            })
            .catch(err => console.log(err))
        
        return () => {
            
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
            window.location.href = "/cart";
        })
        .catch(err => {
            alert('Login First');
            window.location.href = "/login";
        })
    }

    //add shopping item list

    const addItem = (seller_id,Product_id, totalPrice) => {

        const body = { 
            quantity,
            totalPrice
        }
        axios.post(`/shoppingitem/${seller_id}/${Product_id}`, body)
        .then(res => {
            console.log(res)
            window.location.href = "/";
        })
        .catch(err => {
            alert('Login First');
            window.location.href = "/login";
        })
    }
    
    return (
        <div>

            {product.map((value, index) => {
                if(value._id === id){
                    return(
                        <>
                            <div className='container my-2'>
                                <h1 style={{color:'#403f3e', margin: '20px'}}><i className="fas fa-file-invoice"></i> Product Details</h1>
                            </div>
                             {value.products.map((p, i) => {
                                 
                                 if(i === parseInt(indexParams)){

                                    // console.log(param.user.role)
                                    // if(param.user.role === 'admin' || param.user.role === 'user' ){
                                    //     //console.log(document.getElementById('btng'))
                                    //     document.getElementById('btng').style.display = 'flex' 
                                    //     //document.getElementById('quantaties').style.display = 'block'
                                    // }
                                     return(
                                         <div className='container' style={{marginBottom: '20px'}}>
                                             
                                            <div className='row p-0 g-5'>
                                                <div className='col-sm-6' style={{textAlign: 'center', height: '100%', overflow: 'hidden'}}>
                                                    <img style={{ marginBottom: '20px' , borderRadius: '3px'}} src={window.location.origin + `/productAvater/${p.avater}`} width= '300px' />
                                                </div>
                                                <div className='col-sm-6'>
                                                    <h2 style={{color: 'gray'}}> <i className="fab fa-phoenix-framework"></i> {value.shopname}</h2>
                                                    <h1> <i className="fas fa-pizza"></i>   {p.title}</h1>
                                                    <p className='productDescription'>{p.description}</p>
                                                    <div style={{ marginBottom: '20px'}}>
                                                        <span className='text-primary font-weight-bold' style={{marginRight: '20px'}}>
                                                        <i className="fas fa-sort-amount-up"></i> Quantity:</span> 
                                                        <button className='btn btn-primary' onClick={()=> {
                                                            setquantity((prev) => {
                                                                return (prev - 1)
                                                            })
                                                        }}>-</button>
                                                        <span style={{padding: '10px'}}>{quantity}</span>
                                                        <button className='btn btn-primary' onClick={()=> {
                                                            setquantity((prev) => {
                                                                return (prev + 1)
                                                            })
                                                        }}>+</button>
                                                    </div>
                                                    <h4><i className="fab fa-bitcoin"></i> tk {p.price * quantity}</h4>
                                                    <div style={{display: 'flex'}} id='btng'>
                                                        <button onClick={() => addCart(value._id,p._id, p.price * quantity)} className='btn btn-secondary'>
                                                            <i style={{color: '#2b2c2e'}} className="fas fa-cart-plus"></i> Add to cart 
                                                        </button>

                                                        <button onClick={() => addItem(value._id,p._id, p.price * quantity)} className='btn btn-success' style={{marginLeft: '10px'}}>
                                                            <i style={{ color: "#2b2c2e" }} className="fas fa-tags"></i> Check In
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                             
                                         </div>
                                     )
                                 } 
                             })}
                         </>
                     )
                }
            })}
            
        </div>
    );
};

export default Product;