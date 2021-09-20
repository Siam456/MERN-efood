import axios from 'axios';
import React, {useState} from 'react';
import './shoprq.css'

const ShopRq = () => {
    const [user, setuser] = useState({
        name: '',
        shopname: '',
        email: '',
        phone: '',
        address: 'Faridpur',
        password: '',
       
    });

    const [avater, setavater] = useState(null);
    const [menu, setmenu] = useState(null);

    //store data into state
    const setval = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        console.log(user);

        if(name === 'avater'){
            setavater(e.target.files[0]);
        } else if(name === 'menu'){
            setmenu(e.target.files[0]);
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


    //post
    const postShopRq = (e) => {

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
        data.append('menu', menu);

        
        axios.post('/shoprq', data)
        .then(res => console.log(res))
        .catch(err => { 
            console.log(err.response)
            const ree = err.response.data.errors;

            if(ree){
                Object.keys(ree).forEach((errorname) => {
                    //error placeholders
                    document.getElementById(`error-${errorname}`).textContent = ree[errorname].msg;
    
                    //input error
                    const inputError = document.getElementById(`${errorname}`);
                    inputError.classList.add('ei-error');
                });
            } else{
                console.log(err)
            }
            
            
        })
    }

    return (
        <>
            <div className='background'>
                <div className='overly'>
                <div className='container'>
                    <div className='shoprqWrapper'>
                    <div className="row gx-5" style={{textAlign: 'center'}}>
                        <div className="col-sm" style={{textAlign: 'left'}}>
                            <h1>PARTNER WITH US</h1> <br />
                            <h4>We're hungry for the best things in life: delicious food, exploring the city and bringing the first bite of food to our customers. <br></br> <br></br> foodpanda is multi-national, fast-growing business that maintains its appeal as localised service with community ambition.</h4>
                        <br /> <br /> <br />
                        </div>
                        <div className="col-sm">
                            <div id='shoprq-form-ind'></div>
                            <div className='shoprq-form'>
                                <h5>Interested? Fill in the form below to become our partner and increase your revenue!</h5>
                                <br/>
                                <p>To sign up via Tel/Email: 09677777123</p>
                                <p>To sign up by yourself please fill in below form:</p> <br />

                                <form method='POST' onSubmit={postShopRq} enctype='multipart/form-data'>
                                    <div className="form-group" style={{position: 'relative'}}>
                                        <label className="form-text text-muted" for="name">Username</label>
                                        <input onChange={setval} type="text" className="form-control i-error" name='name' id="name" placeholder="Enter username" />
                                        <p className='e-placeholder' id='error-name' style={{color: 'red', marginLeft: '15px'}}></p>
                                    </div> 
                                    <div className="form-group" style={{position: 'relative'}}>
                                        <label className="form-text text-muted" for="shopname">Shopname</label>
                                        <input onChange={setval} type="text" className="form-control  i-error" name='shopname' id="shopname" placeholder="Enter shopname" />
                                        <p className='e-placeholder' id='error-shopname' style={{color: 'red', marginLeft: '15px'}}></p>
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
                                        <input onChange={setval} type="file" className="form-control  i-error" name='avater' id='avater' />
                                        <p style={{opacity: '50%', color: 'red', marginLeft: '15px'}}>Must Upload Avater</p>
                                    </div> <br />

                                    <div className="form-group" style={{position: 'relative'}}>
                                        <label className="form-text text-muted" for="menu">Menu/Item List Upload</label>
                                        <input onChange={setval} type="file" className="form-control  i-error" name='menu' id='menu' />
                                        <p style={{opacity: '50%', color: 'red', marginLeft: '15px'}}>Must Upload Menu</p>
                                    </div> <br />
                                    
                                    <div className="form-group" style={{position: 'relative'}}>
                                        <label className="form-text text-muted" for="address">Address</label>
                                        
                                        <label className="form-text text-muted" htmlFor="vehicle">Select vehicle</label>
                                        <select className="form-select i-error" name='address' id="address" onChange={setval}>
                                            <option value="Faridpur">Faridpur</option>
                                            <option value="Dhaka">Dhaka</option>
                                            <option value="Sadarpur">Sadarpur</option>
                                        </select> <br />

                                        <p className='e-placeholder' id='error-address' style={{color: 'red', marginLeft: '15px'}}></p>
                                    </div> 

                                    <input className='sub' type='submit' />
                                </form> 
                            </div><br />
                                <br />
                        </div>
                        
                    </div>
                    </div>
                    
                </div> </div>
            </div>
            <div className='container'>
                <div className='shopRqWord'>
                    <h3>How it Works</h3>

                    <div class="row" style={{textAlign: 'center'}}>
                    <div className="col-sm">
                        <i className="fas fa-mobile fa-10x"></i>
                        <p>Restaurant accepts the order
                        through the tablet we provide,
                        and starts preparing the food for a
                        specific pick up time.</p>
                    </div>
                    <div className="col-sm">
                        <i className="fas fa-cart-plus fa-10x"></i>
                        <p>Restaurant accepts the order
                        through the tablet we provide,
                        and starts preparing the food for a
                        specific pick up time.</p>
                    </div>
                    <div className="col-sm">
                        <i className="fas fa-biking fa-10x"></i>
                        <p>Our rider arrives at the right time
                        to collect and delivers the order
                        within 30 minutes after the order was placed.</p>
                    </div>
                    <div className="col-sm">
                        <i className="fas fa-american-sign-language-interpreting fa-10x"></i>
                        <p>Foodpanda sends you the proceeds
                        from your orders every month and
                        provides deep insights on your
                        performance.</p>
                    </div>
                    <a href='#shoprq-form-ind'>Get Start</a>
                </div>
                </div>
            </div>
        </>
    );
};

export default ShopRq;