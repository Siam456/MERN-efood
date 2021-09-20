import axios from 'axios';
import React , { useState } from 'react';
import './login.css'
import LoginImg from './login.svg'

const Login = () => {
    const [user, setuser] = useState({
        username: '',
        password: '',
    });

    const setval = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setuser((prev) => {
            if(name === 'username'){
                return({
                    username: value,
                    password: prev.password,
                })
            } else if(name === 'password'){
                return({
                    username: prev.username,
                    password: value,
                })
            }
        })
    }

    const postLogin = (e) => {
        e.preventDefault();
        
        axios.post('/login', user)
        .then(res => {
            window.location.replace("http://localhost:3000/");
        })
        .catch(err => {
            document.getElementById('login-err').textContent = 'Login failed try again!!!'
        })
    }

    return (
        <>
            <div className='container'>
                <div className='login-main'>
                    <div className="row">
                        <div className="col-sm">
                            <div className='loginImg'>
                                <img src={LoginImg} alt='siam' width= '100%' />
                            </div>
                        </div>
                        <div className="col-sm">
                            
                            <form method='POST' onSubmit={postLogin}>
                            <h3>eFood Application - LogIn</h3>
                                <input type="text" onChange={setval} className="form-control" name='username' placeholder="Email/Phone" /> <br></br>
                                <input type="password" onChange={setval} className="form-control" name='password' placeholder="Password" /> <br></br>
                                <a href='/register' style={{float: 'right'}}>Need Account??</a>
                                <p id='login-err' style={{ color: 'red', marginLeft: '10px'}}></p>
                                
                                <input type="submit" className="btn btn-primary" value="Log in" />
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;