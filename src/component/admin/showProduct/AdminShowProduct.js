import axios from 'axios';
import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './adminShowProducts.css'

const AdminShowProduct = () => {
    const [shop, setshop] = useState([])

    let unmount = true;
    useEffect(() => {
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
    }, [])

    //delete product

	const delProduct = (id) => {
		axios.delete(`/product/${id}`)
		.then(res => {
            alert('delete successfully');
            window.location.reload();
        })
		.catch(err => console.log(err))
	}

    //add feature list
    const fetureProduct = (id) => {
        alert('Ok Done')

        axios.patch(`/product/f/f/${id}`)
		.then(res => {
            alert('Successfully done');
            window.location.reload();
        })
		.catch(err => console.log(err))
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
                                                    <div>

                                                    <div className="cardX" type="button" data-toggle="modal" data-target="#exampleModalLong">
                                                        <div className="card-d">

                                                                <div className="card-d-wi">
                                                                    <span style={{ fontWeight: "bold" }}>{p.title}</span>
                                                                    <br />
                                                                    <span style={{ color: "gray", width: "auto" }}>{trimmedString}...</span>
                                                                    <br />
                                                                    <span>tk {p.price}</span>
                                                                    <br />
                                                                </div>

                                                            <div style={{ overflow: "hidden", float: "right" }}>{productImg}</div>
                                                        </div>
                                                        <button className="card-b">
                                                                <i onClick={() => fetureProduct(p._id)} className="fas fa-star-half-alt"></i>
                                                        </button>
                                                        <button className="card-b" style={{marginLeft: '15px'}}>
                                                            <i  onClick={() => delProduct(p._id)} className="far fa-trash-alt"></i>
                                                        </button>
                                                    </div>

                                                    

                                                    {/* <!-- Modal --> */}

                                                    
                                                    
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

export default AdminShowProduct;