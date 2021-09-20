import React , {useState} from 'react';
import './riderrq.css'
import Imgrider from '../image/rider.jpg'
import ImgriderOne from '../image/rider2.jpg'
import ImgriderTwo from '../image/rider3.jpg'
import axios from 'axios';


const RiderRq = () => {

    const [user, setuser] = useState({
        name: '',
        vehicle: 'bike',
        email: '',
        phone: '',
        password: '',
        address: 'Faridpur',
        role: 'rider',
       
    });

    const [avater, setavater] = useState(null);

    const setval = (e) => {
        const value = e.target.value;
        const name = e.target.name;

       // console.log(user);


        if(name === 'avater'){
            setavater(e.target.files[0]);
        } else{

        setuser((prev) => {

            if(name === 'name'){
                return({
                    name: value,
                    vehicle: prev.vehicle,
                    email: prev.email,
                    phone: prev.phone,
                    password: prev.password,
                    address: prev.address,
                    role: prev.role,
                    
                })
            } else if(name === 'address'){
                return({
                    name: prev.name,
                    vehicle: prev.vehicle,
                    email: prev.email,
                    phone: prev.phone,
                    password: prev.password,
                    address: value,
                    role: prev.role,
                    
                })
            } else if(name === 'vehicle'){
                return({
                    name: prev.name,
                    vehicle: value,
                    email: prev.email,
                    phone: prev.phone,
                    password: prev.password,
                    address: prev.address,
                    role: prev.role,
                    
                })
            }  else if(name === 'email'){
                return({
                    name: prev.name,
                    vehicle: prev.vehicle,
                    email: value,
                    phone: prev.phone,
                    password: prev.password,
                    address: prev.address,
                    role: prev.role,
                    
                })
            }  else if(name === 'phone'){
                return({
                    name: prev.name,
                    vehicle: prev.vehicle,
                    email: prev.email,
                    phone: value,
                    password: prev.password,
                    address: prev.address,
                    role: prev.role,
                    
                })
            }  else if(name === 'password'){
                return({
                    name: prev.name,
                    vehicle: prev.vehicle,
                    email: prev.email,
                    phone: prev.phone,
                    password: value,
                    address: prev.address,
                    role: prev.role,
                    
                })
            } 
        }) }
    }

    //post data

    const postData = (e) => {
        e.preventDefault();

        const inputError = document.querySelectorAll('input.i-error');
        for( let i = 0 ; i< inputError.length ; i++){
            inputError[i].classList.remove('ei-error');
        }

        //e-placeholder

        const errorPlaceHolderAll = document.querySelectorAll('p.e-placeholder');
        for( let j = 0 ; j < errorPlaceHolderAll.length ; j++){
            errorPlaceHolderAll[j].textContent = ''
        }
        
        const newUSer = JSON.stringify(user);
        const data = new FormData();
        data.append('user',newUSer);
        data.append('avater', avater);

        axios.post('/riderRq', data)
        .then(res => console.log(res))
        .catch(err => {
            //console.log(err.response.data.msg)

            if(err.response.data.msg){
                document.getElementById('error-avater').textContent = err.response.data.msg;
            } else{
                const re = err.response.data;

                Object.keys(re.errors).forEach(errorname => {
                    const errorPlaceholder = document.getElementById(`error-${errorname}`);
                    errorPlaceholder.textContent = re.errors[errorname].msg;

                    // //input error
                    const inputError = document.getElementById(`${errorname}`);
                    inputError.classList.add('ei-error');
                
            })
            }

            
        })

    }



    return (
        
        <>
            <div className='container'>
                <div className='riderrqWrapper'>
                <div className="row" style={{marginBottom: '50px'}}>
                    <div className="col-sm-6">
                        <div className='riderimgWrapper1'>
                            <img src={Imgrider} alt='siam' ></img>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className='formWrapperRider'>
                            <h2 style={{paddingTop: '25px'}}>Create Your profile</h2>
                            <form method='POST' onSubmit={postData} encType='multipart/form-data'>
                                    

                                    <div className="form-group" style={{position: 'relative'}}>
                                        <label className="form-text text-muted" htmlFor="name">Username</label>
                                        <input onChange={setval} type="text" className="form-control i-error" name='name' id="name" placeholder="Enter username" />
                                        <p className='e-placeholder' id='error-name' style={{color: 'red', marginLeft: '15px'}}></p>
                                    </div> 

                                    <div className="form-group" style={{position: 'relative'}}>
                                        <label className="form-text text-muted" htmlFor="address">Address</label>
                                        {/* <input onChange={setval} type="text" class="form-control  i-error" name='address' id="address" placeholder="Enter address" /> */}

                                        <select className="form-select i-error" name='address' id="address" onChange={setval}>
                                            <option value="Faridpur">Faridpur</option>
                                            <option value="Dhaka">Dhaka</option>
                                            <option value="Sadarpur">Sadarpur</option>
                                        </select>


                                        <p className='e-placeholder' id='error-address' style={{color: 'red', marginLeft: '15px'}}></p>
                                    </div>


                                        <label className="form-text text-muted" htmlFor="vehicle">Select vehicle</label>
                                        <select onChange={setval}
                                            name="vehicle"  
                                            id="vehicle"
                                            className="form-select">
                                                
                                            <option value="bike" defaultValue>bike</option>
                                            <option value="cycle">cycle</option>
                                        </select> <br></br>
                            

                                    <div className="form-group" style={{position: 'relative'}}>
                                        <label className="form-text text-muted" htmlFor="email">Email</label>
                                        <input onChange={setval} type="email" className="form-control  i-error" name='email' id="email" placeholder="email@mail.com" />
                                        <p className='e-placeholder' id='error-email' style={{color: 'red', marginLeft: '15px'}}></p>
                                    </div> 
                                    
  

                                    <div className="form-group" style={{position: 'relative'}}>
                                        <label className="form-text text-muted" htmlFor="phone">Phone</label>
                                        <input onChange={setval} type="text" className="form-control  i-error" name='phone' id="phone" placeholder="+8801234567890" />
                                        <p className='e-placeholder' id='error-phone' style={{color: 'red', marginLeft: '15px'}}></p>
                                    </div> 

                                    <div className="form-group" style={{position: 'relative'}}>
                                        <label className="form-text text-muted" htmlFor="password">Password</label>
                                        <input onChange={setval} type="password" className="form-control  i-error" name='password' id="password" placeholder="********" />
                                        <p className='e-placeholder' id='error-password' style={{color: 'red', marginLeft: '15px'}}></p>
                                    </div> 
                                    <div className="form-group">
                                        <label className="form-text text-muted" htmlFor="exampleFormControlFile1">Choose file</label>
                                        <input type="file" name='avater' onChange={setval} className="form-control"  />
                                        <p className='e-placeholder' id='error-avater' style={{color: 'red', marginLeft: '15px'}}></p>
                                    </div> <br/>
                              

                                    <input className='subRider' type='submit' />
                                </form>
                        </div>
                    </div>
                    <div className='row flex-column-reverse flex-lg-row' style={{marginLeft: 'auto', marginRight: 'auto'}}>
                        <div className="col-sm-6 my-auto">
                            <div className='det'>
                                <h2> ভাল বেতনের সুযোগ</h2>
                                ডেলিভারির ভিত্তিতে আপনি আয় করতে পারেন মাসে ২৫০০০ টাকা পর্যন্ত! আপনি আপনার নিজের মোটরবাইক বা সাইকেল নিয়ে আসুন

                            </div>
                        </div>
                        <div className="col-sm-6 mt-5">
                            <div className='riderimgWrapper2'>
                                <img src={ImgriderOne} alt='siam' ></img>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 mt-5">
                        <div className='riderimgWrapper2'>
                            <img src={ImgriderTwo} alt='siam' ></img>
                        </div>
                    </div>
                    <div className="col-sm-6 my-auto">
                        <div className='det'>
                            <h2> কাজের সময় নির্ধারণ করুন নিজেই</h2>
                            আপনি পার্ট-টাইম হন বা ফুল-টাইম, আপনি নিজেই বেঁছে নিতে পারবেন আপনার পছন্দ অনুযায়ী কাজের সময়।

                        </div>
                    </div>
                </div>
                </div>

                <div className='applyDetails'>
                    <h2>আবেদন করার জন্য যা প্রয়োজন</h2>
                    <ul>
                        <li>এনড্রয়ড ফোন (৪.২ বা আরও নতুন) অথবা আইফোন 4S বা আরও নতুন।</li>
                        <li>সাইকেল, স্কুটার অথবা মোটরবাইক।</li>
                        <li>জাতীয় পরিচয় পত্র</li>
                        <li>বয়স হতে হবে ১৮+</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default RiderRq;