import axios from 'axios';
import React , { useState, useEffect } from 'react';
import './home.css'

const Home = () => {

    const [products, setproducts] = useState([]);
    
    let flag = 0;
    let unmount = true;
    useEffect(() => {
        axios.get('/product/all')
        .then(res => {
            if(unmount){
                setproducts(res.data.products);
                //console.log(products)
            }
        })
        .catch(err => console.log(err))

        return(() => {
            unmount = false;
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

    //show more
    const showMore = () => {
        document.getElementById('para').classList.remove('hidepara');
        document.getElementById('parabtnLess').classList.remove('hidepara');
        document.getElementById('parabtnMore').classList.add('hidepara');
    }

    //show less
    const showLess = () => {
        document.getElementById('para').classList.add('hidepara');
        document.getElementById('parabtnLess').classList.add('hidepara');
        document.getElementById('parabtnMore').classList.remove('hidepara');
    }
    return (
        <div>

            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active" style={{position: 'relative', maxHeight: '90vh', overflow: 'hidden'}}>
                    <img className="d-block w-100" src="https://thumbs.dreamstime.com/b/food-background-breakfast-yogurt-granola-muesli-strawberries-banner-image-website-gray-concrete-table-top-view-214357125.jpg" alt="First slide" />
                    <div className='bannerDes'>
                        <h2>Welcome to efood</h2>
                        <p className='text-muted'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, repudiandae?</p>
                        <a href='#start' className='btn btn-outline-dark'>get Start</a>
                    </div>
                </div>
                <div className="carousel-item" style={{position: 'relative', maxHeight: '90vh', overflow: 'hidden'}}>
                    <img className="d-block w-100" src="https://images.squarespace-cdn.com/content/v1/555b5cf1e4b0864ccf1a0156/1483549305598-ZE4SGFY3MD4Y33TP05OA/Website+Background+Image.jpg?format=1500w" alt="Second slide"/>
                    <div className='bannerDes'>
                        <h2>Welcome to efood</h2>
                        <p className='text-muted'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, repudiandae?</p>
                        <a href='#start' className='btn btn-outline-dark'>get Start</a>
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
            </div>

            
                
            <br/> <br/>
            <div className="container" id='start'>
                <div className="row">
                    <h1><i className="fab fa-free-code-camp"></i> Most Populor</h1>
                    {products.map((value, index) => {
                        let productImg;
                        if(value.avater === null){
                            productImg = <div style={{height:'270px', width: '100%', background: 'white', color: 'gray'}}>No Photo</div>
                        } else{
                            productImg = <img style={{ marginBottom: '20px' , borderRadius: '3px'}} src={window.location.origin + `/productAvater/${value.avater}`} height='auto' width='100%' />
                        }
                        if(index< 4){
                            return(
                                <div className="col-sm">
                                    
                                    <div className='card'>
                                        <div style={{height:'270px', overflow: 'hidden'}}>
                                            {productImg}
                                        </div>
                                        <div className='body'>
                                            <div className='title'>
                                                <h4>
                                                    <i className="fas fa-pizza" /> {value.title}
                                                </h4>
                                            </div>
                                            <p className='text-wrap' style={{color: 'gray'}}>{value.description}</p>
                                            <p><i className="fab fa-bitcoin"></i> tk {value.price}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}

                    
                </div>
                <div style={{width: '100%', textAlign: 'center', marginBottom: '50px', marginTop: '50px'}}>
                    <a href='http://localhost:3000/populorProduct' className='subn'>Show More</a>
                </div>
            </div>

                    {/* ///shop req */}
                <section>
                    <div className='container'>
                        <h2 className='text-muted'>You prepare the food, we handle the rest</h2>
                    </div>
                    <div className='infoimg'>
                        <div ></div>
                            <img className="d-block w-100" src="https://wallpaperaccess.com/full/1306019.jpg" alt="Second slide" />
                        <div className='info'>
                            <p style={{fontSize: '25px'}}>List your restaurant or shop on efood</p>
                            <p className='text-muted'>Would you like millions of new customers to enjoy your amazing food and groceries? So would we!
                            It's simple: we list your menu and product lists online, help you process orders, pick them up, and deliver them to hungry pandas – in a heartbeat!
                            Interested? Let's start our partnership today!</p>
                            <a href='/shoprq' className='btn btn-danger'>Get Start</a>
                        </div>
                        
                    </div>
                    
                </section>

                    <div className='container' >
                <div className="row" style={{marginTop: '70px'}}>
                    <h1><i className="fas fa-star"></i>Featured Product</h1>
                    {products.map((value, index) => {
                        
                        let productImg;
                        if(value.avater === null){
                            productImg = <div style={{height:'270px', width: '100%', background: 'white'}}></div>
                        } else{
                            productImg = <img style={{ marginBottom: '20px' , borderRadius: '3px'}} src={window.location.origin + `/productAvater/${value.avater}`} width='100%' />
                        }
                        if(flag<4 && value.feature === 'true'){
                            return(
                                <div className="col-sm">
                                    <p style={{display: 'none'}}>{flag++}</p>
                                    <div className='card'>
                                        <div style={{height:'270px', overflow: 'hidden'}}>
                                            {productImg}
                                        </div>
                                        <div className='body'>
                                            <div className='title'>
                                                <h4>
                                                    <i className="fas fa-pizza" /> {value.title}
                                                </h4>
                                            </div>
                                            <p className='text-wrap' style={{color: 'gray'}}>{value.description}</p>
                                            <p><i className="fab fa-bitcoin"></i> tk {value.price}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                    
                </div>
                <div style={{width: '100%', textAlign: 'center', marginBottom: '50px', marginTop: '50px'}}>
                    <a href='http://localhost:3000/featureProduct' className='subn'>Show More</a>
                </div>
            </div>

                {/* ///rider req */}
                <section>
                    <div className='container'>
                        <h2 className='text-muted'>Ride with the item and earn money</h2>
                    </div>
                    <div className='infoimg'>
                        <div ></div>
                            <img className="d-block w-100" src="https://images.unsplash.com/photo-1572195577046-2f25894c06fc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVsaXZlcnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" alt="Second slide" />
                        <div className='info'>
                            <p style={{fontSize: '25px'}}>Share your riding expreince on efood</p>
                            <p className='text-muted'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the.</p>
                            <a href='/riderrq' className='btn btn-danger'>Get Start</a>
                        </div>
                        
                    </div>
                    
                </section>

                <div className='container my-5'>
                    <h4>Order food from the best restaurants and shops with efood Bangladesh</h4>
                    <p className='text-muted'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                    <div className='hidepara' id='para'>
                        <p className='text-muted'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                    
                    </div>
                <button id='parabtnMore' onClick={showMore} 
                style={{paddingLeft: '70px', paddingRight: '70px'}} className="btn btn-outline-dark">Show more</button>
                
                <button id='parabtnLess' onClick={showLess} 
                style={{paddingLeft: '70px', paddingRight: '70px'}} className="btn btn-outline-dark hidepara">Hide</button>
                
                </div>

            
         </div>
    );
};

export default Home;