import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "./shopProduct.css";
import ShopCart from "./ShopCart";

const ShopProducts = () => {
	let source;
	let sourceProduct;
	let srcMI
	const { id } = useParams();

	const [shop, setshop] = useState([]);
	

	const [products, setproducts] = useState([]);
	const [productDet, setproductDet] = useState({
		_id: '',
		title: '',
		description: '',
		price: '',
		avater: ''
	});

	
	useEffect( () => {

		// try{
		// 	const res = await axios.get(`/user/shop/${id}`);
		// 	const resCart = await axios.get("/cart");
		// 	if(unmount){
		// 		setshop(res.data.users);
		// 		setproducts(res.data.users.products);
		// 		//console.log(products)	
		// 	}
		// } catch(err){
		// 	console.log(err)
		// }

		
		// //sconsole.log(id)
		axios.get(`/user/shop/${id}`)
		.then(res => {
			
				setshop(res.data.users);
				setproducts(res.data.users.products);
				//console.log(products)
			
		})
		.catch(err => console.log(err));

		
		// axios.get("/cart")
		// .then(res => {
		// 	if(unmount){
		// 		setcart(res.data.cart);
		// 		//console.log(res.data.cart)
		// 	}
		// })
		// .catch(err => console.log(err));
		return(() => {
			console.log('ok close')
		})
		
	
		
	}, []);

	//add cart

	const addcart = async (id, status) => {
		//alert(id);
		//alert(status);
		var up = true;
		let body = {
			status: status,
		};
		
		try{
			const res = await axios
			.put(`http://localhost:3000/cart/${id}/${shop._id}`, body);

			if(up){
				console.log(res)
			}
			
		} catch(err){
			console.log(err)
		}
		return(() => {
			up = false;
		})
	};

	

	//modal
	const openModal = (value) => {
		//console.log(value._id)
		axios.patch(`/product/0/${value._id}`)
		.then(res => {})
		.catch(err => console.log(err))


		var modal = document.getElementById("myModal");
		modal.style.display = "block";
		setproductDet(value);
		//console.log(productDet);
		
	} 

	const closeModal = () => {
		var modal = document.getElementById("myModal");
		modal.style.display = "none";
	}

	return (
		<>

		
			<div style={{ display: "flex" }}>
			
				<div className="cartbody">
					<span style={{ display: "none" }}>
						{shop.avater
							? (source = window.location.origin + `/userUpload/${shop.avater}`)
							: (source =
									"https://images.unsplash.com/photo-1544148103-0773bf10d330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80")}
					</span>
					<div className="parentImg">
						<img className="childImg" src={source} alt="banner" width="100%" />
					</div>
					<div
						style={{
							width: "90%",
							margin: "auto",
							marginTop: "20px",
							marginBottom: "100px",
						}}
					>
						<h2>{shop.shopname}</h2>
						<p className="text-muted">
							<i className="fas fa-map-pin"></i> {shop.address}
						</p>

						<div className="container my-5">
							<div className="row">
								{products.length !== 0 ? (
									products.map((v, i) => {
										var trimmedString = v.description.substring(0, 6);

										{
											v.avater
												? (sourceProduct =
														window.location.origin +
														`/productAvater/${v.avater}`)
												: (sourceProduct =
														"https://images.unsplash.com/photo-1544148103-0773bf10d330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80");
										}
										return (
											<>

												<div key={i} className="col-sm-12 col-md-6 col-xl-4 col-lg-6 my-2">
													<div style={{ position: "relative" }}>
														<a
															style={{ textDecoration: "none", color: "black" }}
														>
															<div className="cardX" onClick={() => openModal(v)}>
															
																<div className="card-d">
																	<div className="card-d-wi">
																		<span style={{ fontWeight: "bold" }}>
																			{v.title}
																		</span>
																		<br />
																		<span
																			style={{
																				color: "#333b39",
																				width: "auto",
																			}}
																		>
																			{trimmedString}...
																		</span>
																		<br />
																		<span>
																			<i className="fab fa-bitcoin"></i> tk{" "}
																			{v.price}
																		</span>
																		<br />
																	</div>

																	<div
																		style={{
																			overflow: "hidden",
																			float: "right",
																			height: "80px",
																			width: "80px"
																		}}
																	>
																		<img
																			class="card-img-top"
																			src={sourceProduct}
																			alt="Card image cap"
																			height="80px"
																			
																		/>
																	</div>
																</div>

																
																<i className="fas fa-arrow-right"></i>
															</div>
														</a>

														<div id="myModal" class="modalA">

															<div class="modal-contentA">
																<span class="close" onClick={closeModal}>&times;</span>
																<p>Product Details..</p>
																<div style={{display: 'none'}}>
																{productDet.avater ? srcMI = window.location.origin +`/productAvater/${productDet.avater}` 
																:srcMI = "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" }
																
																</div>
																
																<div style={{textAlign: 'center', marginTop: '90px'}}>
																	<img src={srcMI} alt='siam'/>
																</div>
																<div className='container'>
																	<h3 className='my-3'><i className="fas fa-pizza"></i> {productDet.title}</h3>
																	<p className='text-muted' style={{marginLeft: '10px'}}> {productDet.description}</p>
																	<p><i className="fab fa-bitcoin"></i> TK {productDet.price}</p>

																	<div className='btn btn-danger'>
																		<i
																			className="fas fa-plus" 
																			onClick={() => addcart(productDet._id, "add")}
																		>  Add to cart</i>
																	</div>
																</div>
															</div>
														</div>

														<div class="addbtn">
															<i
																className="fas fa-plus"
																onClick={() => addcart(v._id, "add")}
															></i>
														</div>
													</div>

													
												</div>

						
												
											</>
										);
									})
								) : (
									<div class="noProduct">No Products available</div>
								)}
							</div>
						</div>
					</div>
				</div>

			<ShopCart />

			</div>

			
		</>
	);
};

export default ShopProducts;
