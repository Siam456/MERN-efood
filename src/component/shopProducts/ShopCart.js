import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "./shopProduct.css";

const ShopCart = () => {
	let sourceCart;

	const [shop, setshop] = useState([]);
	const [cart, setcart] = useState([]);

	let total = 0;
	let item = 0;

	
	
	//try
	const getdata = async () => {
		//console.log('siams')
		try{
			const res = await axios.get("/cart");
			setcart(res.data.cart);
			//console.log(res) 
			
		} catch(err){
			console.log(err)
			
		}
	}

	
	useEffect(() => {
		
		getdata();

		return(() => {
			//console.log('clean up too')
		})
	}, [cart])

	//add cart

	const addcart = (id, status) => {
		//alert(id);
		//alert(status);
		let body = {
			status: status,
		};

		axios
			.put(`http://localhost:3000/cart/${id}/${shop._id}`, body)
			.then((res) => console.log('siam'))
			.catch((err) => console.log(err));
	};

	//remove from cart
	const removeCart = (id) => {
		///alert(id)

		axios
			.delete(`/cart/${id}`)
			.then((res) => {
				
			})
			.catch((err) => console.log(err));
	};

	//check out 
	const checkOut = () => {
		console.log(cart)
		let body = {
			cart: cart
		}

		axios.patch('/shoppingitem/arraypost', body)
		.then(res => console.log(res))
		.catch(err => console.log(err))
	}

	
	return (
		<>

{/* //akhn theke */}
				<div className="cartY">
				
					<div style={{ textAlign: "center", marginTop: '20px' }}>
						<h5>Your cart</h5>
						<p className="text-muted">Start adding items to your cart</p>

						{cart.map((cart, index) => {
							return (
								<>
									<div key={index} style={{ display: "none" }}>
										{(item = index)}
										{(total = total + cart.totalPrice)}
									</div>
									{cart.products !== null ? (
										<div
											style={{
												borderBottom: "1px solid #c7c5bf",
												display: "flex",
												padding: "13px",
                                                width: '100%',
												flexWrap: 'wrap',
												alignContent: 'space-between'
											}}
										>
											<div style={{ display: "none" }}>
												{cart.products.avater
													? (sourceCart =
															window.location.origin +
															`/productAvater/${cart.products.avater}`)
													: (sourceCart =
															"https://images.unsplash.com/photo-1544148103-0773bf10d330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80")}
											</div>

											<div style={{justifyContent: 'left'}}>
												<img
													src={sourceCart}
													alt="siam"
													height="50px"
													width="50px"
												/>
											</div>
											<div style={{ padding: "7px", color: "#d1323f", textAlign: 'center' }}>
												<p style={{ alignItems: "center", width: "90%" }}>
													{cart.products.title}
												</p>
											</div>
											<div style={{ display: "block", justifyContent: 'right' }}>
												<span>BDT {cart.totalPrice}</span>
												<br />
												<span>
													{cart.quantity <= 1 ? (
														<i
															style={{ color: "#d1323f" }}
															className="fas fa-trash"
															onClick={() => removeCart(cart._id)}
														></i>
													) : (
														<i
															style={{ color: "#d1323f" }}
															className="fas fa-minus"
															onClick={() =>
																addcart(cart.products._id, "remove")
															}
														></i>
													)}{" "}
												</span>
												<span>{cart.quantity}</span>
												<span>
													{" "}
													<i
														style={{ color: "#d1323f" }}
														className="fas fa-plus"
														onClick={() => addcart(cart.products._id, "add")}
													></i>
												</span>
											</div>
										</div>
									) : (
										<div
											className="text-muted"
											style={{ padding: "20px", border: "1px dotted gray" }}
										>
											Product Was Deleted <span onClick={() => removeCart(cart._id)}
											style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>delete it</span>
										</div>
									)}
								</>
							);
						})}
						<div className="my-3" style={{ textAlign: "left", padding: "5px" }}>
							<span>
								Subtotal:{" "}
								<span style={{ float: "right", paddingRight: "30px" }}>
									Tk {total}
								</span>
							</span>{" "}
							<br />
							<span className="text-muted">
								Delivery Fee:{" "}
								<span style={{ float: "right", paddingRight: "30px" }}>
									Tk 0
								</span>
							</span>
							<br />
							<span className="text-muted">
								VAT:{" "}
								<span style={{ float: "right", paddingRight: "30px" }}>
									Tk 0
								</span>
							</span>
							<br />
							<span className="text-muted">
								Discount:{" "}
								<span style={{ float: "right", paddingRight: "30px" }}>
									Tk 0
								</span>
							</span>
							<br />
							<br />
							<h6>
								Total(Incl. VAT):{" "}
								<span style={{ float: "right", paddingRight: "30px" }}>
									Tk {total}
								</span>
							</h6>
							<br />
							<button onClick={checkOut} className="checkbtn">Check Out</button>
						</div>
					</div>
				</div>

				<div className="cartbtnWrapper">
				{/* <a className='cartbtn' href='/cart' >View Cart </a> */}
				{/* <!-- Button trigger modal --> */}
				<button
					type="button"
					className="btn cartbtn"
					data-toggle="modal"
					data-target="#exampleModalLong"
				>
					<span style={{ float: "left" }}>
						<i className="fas fa-shopping-bag">
							{" "}
							{item !== 0 ? <span> {item + 1}</span> : <span> </span>}
						</i>
					</span>{" "}
					REVIEW PICK_UP ORDER{" "}
					<span style={{ float: "right" }}>TK {total}</span>
				</button>
			</div>

			{/* <!-- Modal --> */}
			<div
				className="modal fade"
				id="exampleModalLong"
				tabindex="-1"
				role="dialog"
				aria-labelledby="exampleModalLongTitle"
				aria-hidden="true"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLongTitle">
								Your Cart
							</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="cart">
								<div style={{ textAlign: "center" }}>
									<h5>Your cart</h5>
									<p className="text-muted">Start adding items to your cart</p>

									{cart.map((cart, index) => {
										return (
											<>

												{cart.products !== null ? (
													<div
														key={index}
														style={{
															borderBottom: "1px solid #c7c5bf",
															display: "flex",
															padding: "13px",
														}}
													>
														<div style={{ display: "none" }}>
															{cart.products.avater
																? (sourceCart =
																		window.location.origin +
																		`/productAvater/${cart.products.avater}`)
																: (sourceCart =
																		"https://images.unsplash.com/photo-1544148103-0773bf10d330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80")}
														</div>

														<div>
															<img
																src={sourceCart}
																alt="siam"
																height="50px"
																width="50px"
															/>
														</div>
														<div style={{ padding: "7px", color: "#d1323f" }}>
															<p style={{ alignItems: "center", width: "90%" }}>
																{cart.products.title}
															</p>
														</div>
														<div style={{ display: "block" }}>
															<span>BDT {cart.totalPrice}</span>
															<br />
															<span>
																{cart.quantity === 1 ? (
																	<i
																		style={{ color: "#d1323f" }}
																		className="fas fa-trash"
																		onClick={() => removeCart(cart._id)}
																	></i>
																) : (
																	<i
																		style={{ color: "#d1323f" }}
																		className="fas fa-minus"
																		onClick={() =>
																			addcart(cart.products._id, "remove")
																		}
																	></i>
																)}{" "}
															</span>
															<span>{cart.quantity}</span>
															<span>
																{" "}
																<i
																	style={{ color: "#d1323f" }}
																	className="fas fa-plus"
																	onClick={() =>
																		addcart(cart.products._id, "add")
																	}
																></i>
															</span>
														</div>
													</div>
												) : (
													<div
														className="text-muted"
														style={{ padding: "20px", border: "1px dotted gray" }}
													>
														Product Was Deleted <span onClick={() => removeCart(cart._id)}
														style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>delete it</span>
													</div>
												)}
											</>
										);
									})}
									<div
										className="my-3"
										style={{ textAlign: "left", padding: "5px" }}
									>
										<span>
											Subtotal:{" "}
											<span style={{ float: "right", paddingRight: "30px" }}>
												Tk {total}
											</span>
										</span>{" "}
										<br />
										<span className="text-muted">
											Delivery Fee:{" "}
											<span style={{ float: "right", paddingRight: "30px" }}>
												Tk 0
											</span>
										</span>
										<br />
										<span className="text-muted">
											VAT:{" "}
											<span style={{ float: "right", paddingRight: "30px" }}>
												Tk 0
											</span>
										</span>
										<br />
										<span className="text-muted">
											Discount:{" "}
											<span style={{ float: "right", paddingRight: "30px" }}>
												Tk 0
											</span>
										</span>
										<br />
										<br />
										<h6>
											Total(Incl. VAT):{" "}
											<span style={{ float: "right", paddingRight: "30px" }}>
												Tk {total}
											</span>
										</h6>
										<br />
										<button onClick={checkOut} className="checkbtn">Check Out</button>
										
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>


		</>
	);
};

export default ShopCart;
