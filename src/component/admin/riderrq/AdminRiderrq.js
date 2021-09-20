import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './riderrq.css'

const AdminRiderrq = () => {
    
    const [Riderrq, setRiderrq] = useState([]);

    const [riderDetails, setriderDetails] = useState({
        name: '',
        vehicle: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        role: 'rider',
        avater: '',
    });

    //let unm = false;
    const [userId, setUserId] = useState('');
    useEffect(() => {
        axios.get('/riderrq')
        .then(res => {
            setRiderrq(res.data.users);
        })
        .catch(err => console.log(err));

    }, []);

    //add user from rq

    const addUser = (e) => {

        e.preventDefault();

        const newUSer = JSON.stringify(riderDetails);
        const data = new FormData();
        data.append('user',newUSer);
        
        
        axios.post('/user/rq', data)
        .then(res => alert('siam'))
        .catch(err => console.log(err.message))
    }

    //delete
    const cancelRq = (id) => {
        axios.delete(`/riderrq/${id}`)
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

        setriderDetails((prev) => {
            return{
                name: value.name,
                vehicle: value.vehicle,
                email: value.email,
                phone: value.phone,
                address: value.address,
                password: value.password,
                role: value.role,
                avater: value.avater,
            }
        })

        setUserId(value._id);

        //console.log(riderDetails);

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
                                <th scope="col">Name</th>
                                <th scope="col">Requested At</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        {Riderrq.map((value, i) => {
                                let d = value.createdAt;
                                let date = new Date(d);
                                let formattedDate = date.toDateString();


                                return(
                                    <tr key={i}>
                                        <th style={{ verticalAlign: "middle" }} scope="row">{i+1}</th>
                                        <td style={{ verticalAlign: "middle" }}>
                                            
                                            <span>{value.name}</span> 
                                            
                                        </td>
                                        <td style={{ verticalAlign: "middle" }}>{formattedDate}</td>
                                        <td style={{ verticalAlign: "middle" }}>
                                            <button onClick={() => openModal(value)} className='btn btn-primary'>More</button>


                                            {/* open modal */}

                                            <div className="modala" id="modaledit">
                                                <div className="modala-header">
                                                    <div className="title">Rider Request </div>
                                                    <button onClick={closeModal} className="close-button">
                                                    &times;
                                                    </button>
                                                </div>
                                                <div className="modala-body">
                                                
                                                    
                                                
                                                    <div style={{textAlign: 'center' , marginBottom: '20px'}}>
                                                        <img style={{ marginBottom: '20px'}} src={window.location.origin + `/userUpload/${riderDetails.avater}`} height='auto' width='200px' />
                                                    </div>

                                                    <p><span>Owner Name: </span>{riderDetails.name}</p>
                                                    <p><span>vehicle: </span>{riderDetails.vehicle}</p>
                                                    <p><span>Email: </span>{riderDetails.email}</p>
                                                    <p><span>Phone: </span>{riderDetails.phone}</p>
                                                    <p><span>Given Password: </span>{riderDetails.password}</p>
                                                    <p><span>Address: </span>{riderDetails.address}</p>
                                                    
                                                    
                                                    {/* <img style={{ marginBottom: '20px'}} src={window.location.origin + `/menuUpload/${riderDetails.menu}`} height='auto' width='100%' /> */}

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

export default AdminRiderrq;