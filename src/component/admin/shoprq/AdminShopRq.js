import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './adminshoprq.css'

const ShopRq = () => {
    
    const [shoprq, setshoprq] = useState([]);

    const [shopDetails, setshopDetails] = useState({
        name: '',
        shopname: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        role: 'seller',
        avater: '',
        menu: '',
    });

    let unm = false;
    const [userId, setUserId] = useState('');
    useEffect(() => {
        axios.get('/shoprq')
        .then(res => {
            if(!unm){
                setshoprq(res.data.data);
            }
        })
        .catch(err => console.log(err));

        return () => {
            unm = true
          };

    }, []);

    //add user from rq

    const addUser = (e) => {

        e.preventDefault();

        const newUSer = JSON.stringify(shopDetails);
        const data = new FormData();
        data.append('user',newUSer);
        
        
        axios.post('/user/rq', data)
        .then(res => alert('siam'))
        .catch(err => console.log(err.message))
    }

    //delete
    const cancelRq = (id) => {
        axios.delete(`/shoprq/${id}`)
        .then(res => {
            alert('delete successfullu');
            closeModal();
        })
        .catch(err => console.log(err))
    }

    //open modal
    const openModal = (value) => {
        const modal = document.getElementById("modaledit");
        const overlay = document.getElementById("overlay");
        modal.classList.add("active");
        overlay.classList.add("active");

        setshopDetails((prev) => {
            return{
                name: value.name,
                shopname: value.shopname,
                email: value.email,
                phone: value.phone,
                password: value.password,
                address: value.address,
                role: prev.role,
                avater: value.avater,
                menu: value.menu,
            }
        })

        setUserId(value._id);

        console.log(shopDetails);

    }

    //close modal
        const closeModal = () => {
            const modal = document.getElementById("modaledit");
            const overlay = document.getElementById("overlay");
            modal.classList.remove("active");
            overlay.classList.remove("active");
        };

    return (
        <div className='container'>
            <div style={{textAlign: 'center'}}>
                <div style={{overflow: 'auto'}}>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Shop Name</th>
                                <th scope="col">Requested At</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shoprq.map((value, i) => {
                                let d = value.createdAt;
                                let date = new Date(d);
                                let formattedDate = date.toDateString();


                                return(
                                    <tr>
                                        <th style={{ verticalAlign: "middle" }} scope="row">{i+1}</th>
                                        <td style={{ verticalAlign: "middle" }}>
                                            
                                            <span>{value.shopname}</span> 
                                            
                                        </td>
                                        <td style={{ verticalAlign: "middle" }}>{formattedDate}</td>
                                        <td style={{ verticalAlign: "middle" }}>
                                            <button onClick={() => openModal(value)} className='btn btn-primary'>More</button>


                                            {/* open modal */}

                                            <div className="modala" id="modaledit">
                                                <div className="modala-header">
                                                    <div className="title">Shop Request </div>
                                                    <button onClick={closeModal} className="close-button">
                                                    &times;
                                                    </button>
                                                </div>
                                                <div className="modala-body">
                                                
                                                    
                                                    <p><span>Owner Name: </span>{shopDetails.name}</p>
                                                    <p><span>Shop Name: </span>{shopDetails.shopname}</p>
                                                    <p><span>Email: </span>{shopDetails.email}</p>
                                                    <p><span>Phone: </span>{shopDetails.phone}</p>
                                                    <p><span>Given Password: </span>{shopDetails.password}</p>
                                                    <p><span>Address: </span>{shopDetails.address}</p>
                                                    
                                                    <p><span>menu: </span></p>
                                                    <div style={{textAlign: 'center', width: '100%' , marginBottom: '20px'}}>
                                                        <img style={{ marginBottom: '20px'}} src={window.location.origin + `/menuUpload/${shopDetails.menu}`} height='auto' width='100%' />
                                                    </div>
                                                    {/* <img style={{ marginBottom: '20px'}} src={window.location.origin + `/menuUpload/${shopDetails.menu}`} height='auto' width='100%' /> */}

                                                    <div style={{float: 'right' , marginBottom: '30px'}}>
                                                        <button onClick={addUser} className='btn btn-success'>+</button>
                                                        <button onClick={() => cancelRq(userId)} className='btn btn-danger' style={{marginLeft: '10px'}}>&times;</button>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <div id='overlay'></div>

                                        </td>
                                    </tr>
                                )
                            })}
                            
                        </tbody>
                    </table>  
                </div>

            </div>
        </div>
    );
};

export default ShopRq;