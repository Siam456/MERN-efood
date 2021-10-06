import axios from 'axios';
import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './allProducts.css'

const AllProduct = () => {
    const [shop, setshop] = useState([])

    
    useEffect(() => {
        let unmount = true;
        axios.get('/user/seller') 
        .then(res => {
            if(unmount){
                setshop(res.data.seller);
                //console.log(shop)
            }
        })
        .catch(err => console.log(err))

        return(() => {
            unmount = false
        })
    })

    //show product 
    const showProduct = (id) => {
        //alert(id)

        axios.patch(`/product/0/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))

        //window.location.reload();

        
    }
    return (
        <>
            <div>
                <div className='container'>
                    <h1><i className="fab fa-free-code-camp"></i> Most Populor</h1>
          
                        {shop.map((value, index) => {
                            let spName = <h2></h2>;
                            let cardWrapper = ''
                                if(value.products.length>0){
                                    spName = <h2>{value.shopname}</h2>
                                    cardWrapper= 'row g-5 my-2 cardWrapper'
                                }
                            return(
                                <div>
                                    <div className={cardWrapper}>
                                        {spName}
                                        
                                        
                                        {value.products.map((p, i) => {

                                            //no product show make its
                                            let productImg;
                                            if(p.avater === null){
                                                productImg = <div style={{height:'80px', width: '80px', background: 'red'}}></div>
                                            } else{
                                                productImg = <img style={{ marginBottom: '20px' , borderRadius: '3px'}} src={window.location.origin + `/productAvater/${p.avater}`} height='80px' width='80px' />
                                            }
                                            let linkUrl =  `product/${i}/${value._id}`

                                            var trimmedString = p.description.substring(0, 6);

                                            return(
                                                <div className="col-sm-4">
                                                    <div onClick={() => showProduct(p._id)}>
                                                    <Link to={linkUrl} style={{textDecoration: 'none', color: 'black'}}>
                                                    <div className="cardX">
                                                        <div className="card-d">
                                                            
                                                                <div className="card-d-wi">
                                                                    <span style={{ fontWeight: "bold" }}>{p.title}</span>
                                                                    <br />
                                                                    <span style={{ color: "gray", width: "auto" }}>{trimmedString}...</span>
                                                                    <br />
                                                                    <span><i className="fab fa-bitcoin"></i> tk {p.price}</span>
                                                                    <br />
                                                                </div>
                                                           
                                                            <div style={{ overflow: "hidden", float: "right" }}>{productImg}</div>
                                                        </div>
                                                        <i className="fas fa-arrow-right"></i>
                                                            
                                                    </div>
                                                    </Link>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    
                                    </div>
                                </div>
                            )
                        })}
                    </div>
               
            </div>
        </>
    );
};

export default AllProduct;