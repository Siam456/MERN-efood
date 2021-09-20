import React , {useState, useEffect} from 'react';
import './register.css'
import regImg from './register.svg'
import axios from 'axios';

const Register = () => {

    const [user, setuser] = useState({
        name: '',
        shopname: '',
        email: '',
        phone: '',
        address: 'Faridpur',
        password: '',
       
    });

    const [avater, setavater] = useState(null);


    //store data into state
    const setval = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        console.log(user);
        console.log(avater)

        if(name === 'avater'){
            setavater(e.target.files[0]);
        }
        
        else{
            setuser((prev) => {
                if(name === 'name'){
                    return({
                        name: value,
                        shopname: prev.shopname,
                        email: prev.email,
                        phone: prev.phone,
                        address: prev.address,
                        password: prev.password,
                        
                    })
                } else if(name === 'shopname'){
                    return({
                        name: prev.name,
                        shopname: value,
                        email: prev.email,
                        phone: prev.phone,
                        address: prev.address,
                        password: prev.password,
                        
                    })
                } else if(name === 'email'){
                    return({
                        name: prev.name,
                        shopname: prev.shopname,
                        email: value,
                        phone: prev.phone,
                        address: prev.address,
                        password: prev.password,
                        
                    })
                } else if(name === 'phone'){
                    return({
                        name: prev.name,
                        shopname: prev.shopname,
                        email: prev.email,
                        phone: value,
                        address: prev.address,
                        password: prev.password,
                        
                    })
                } else if(name === 'address'){
                    return({
                        name: prev.name,
                        shopname: prev.shopname,
                        email: prev.email,
                        phone: prev.phone,
                        address: value,
                        password: prev.password,
                       
                    })
                }
                else if(name === 'password'){
                    return({
                        name: prev.name,
                        shopname: prev.shopname,
                        email: prev.email,
                        phone: prev.phone,
                        address: prev.address,
                        password: value,

                       
                    })
                }
                
            })

        }

    }


    //post data to server

    const postUser = (e) => {
        e.preventDefault();

        const errorPlaceHolder = document.querySelectorAll('p.e-placeholder');
        for(let i = 0 ; i< errorPlaceHolder.length ; i++){
            errorPlaceHolder[i].textContent = '';
        }
        
        const inputError = document.querySelectorAll('input.i-error');
        for( let i = 0 ; i< inputError.length ; i++){
            inputError[i].classList.remove('ei-error');
        }

        const newUSer = JSON.stringify(user);
        const data = new FormData();
        data.append('user',newUSer);
        data.append('avater', avater);
        
        
        axios.post('/user', data)
        .then(res => console.log(res))
        .catch(err => {
            console.log(err.response.data.errors)
            const re = err.response.data;

            Object.keys(re.errors).forEach(errorname => {
                const errorPlaceholder = document.getElementById(`error-${errorname}`);
                errorPlaceholder.textContent = re.errors[errorname].msg;

                //input error
                const inputError = document.getElementById(`${errorname}`);
                inputError.classList.add('ei-error');
                
                
            })
        })
    }
    return (
        <>
            <div className='container'>
                <div className='registerWrapper'>
                <div className="container">
                    <div className="row">
                        <div className="col-sm" style={{paddingLeft: '0'}}>
                            <div className='loginImg'>
                                <img src={regImg} alt='siam' width= '60%' />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className='formWrapper'>
                                <h3>efood-application singup</h3>


                                <form method='POST' onSubmit={postUser} enctype='multipart/form-data'>
                                    <div className="form-group" style={{position: 'relative'}}>
                                        <label className="form-text text-muted" for="name">Username</label>
                                        <input onChange={setval} type="text" className="form-control i-error" name='name' id="name" placeholder="Enter username" />
                                        <p className='e-placeholder' id='error-name' style={{color: 'red', marginLeft: '15px'}}></p>
                                    </div> 

                                    <div className="form-group" style={{position: 'relative'}}>
                                        <label className="form-text text-muted" for="email">Email</label>
                                        <input onChange={setval} type="email" className="form-control  i-error" name='email' id="email" placeholder="email@mail.com" />
                                        <p className='e-placeholder' id='error-email' style={{color: 'red', marginLeft: '15px'}}></p>
                                    </div> 

                                    <div className="form-group" style={{position: 'relative'}}>
                                        <label className="form-text text-muted" for="phone">Phone</label>
                                        <input onChange={setval} type="text" className="form-control  i-error" name='phone' id="phone" placeholder="+8801234567890" />
                                        <p className='e-placeholder' id='error-phone' style={{color: 'red', marginLeft: '15px'}}></p>
                                    </div> 

                                    <div className="form-group" style={{position: 'relative'}}>
                                        <label className="form-text text-muted" for="password">Password</label>
                                        <input onChange={setval} type="password" className="form-control  i-error" name='password' id="password" placeholder="********" />
                                        <p className='e-placeholder' id='error-password' style={{color: 'red', marginLeft: '15px'}}></p>
                                    </div>

                                    <div className="form-group" style={{position: 'relative'}}>
                                        <label className="form-text text-muted" for="avater">Avater Upload</label>
                                        <input onChange={setval} type="file" className="form-control" name='avater' id='avater' />
                                        <p style={{opacity: '50%', color: 'red', marginLeft: '15px'}}>Must Upload Avater</p>
                                    </div> <br />
                                    
                                    <div className="form-group" style={{position: 'relative'}}>
                                        <label className="form-text text-muted" for="address">Address</label>
                                        <select className="form-select" name='address' id="address" onChange={setval}>
                                            <option value="Faridpur">Faridpur</option>
                                            <option value="Dhaka">Dhaka</option>
                                            <option value="Sadarpur">Sadarpur</option>
                                        </select> 
                                    </div> 
                                    <a className='link' href='/login'> already have account?</a>
                                    
                                    <input className='sub' type='submit' value='Sing Up' />
                                </form> 

                            </div>
                        </div>
                        
                    </div>
                    </div>

                </div>
            </div>
            
        </>
    );
};

export default Register;