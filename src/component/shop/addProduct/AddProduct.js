import React, { useState, useEffect } from "react";
import "./addproduct.css";
import axios from "axios";

const AddProduct = (props) => {
	const [product, setproduct] = useState({
		title: "",
		description: "",
		price: 0,
	});

	const [EditProduct, setEditProduct] = useState({
		title: "",
		description: "",
		price: 0,
	});

    const [getProduct, setgetProduct] = useState([]);


	const [avater, setavater] = useState(null);

	const [eid, seteid] = useState('')

    

    //store data
	const setval = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		//console.log(avater);
		//console.log(product);

		if (name === "avater") {
			setavater(e.target.files[0]);
		} else {
			setproduct((prev) => {
				if (name === "title") {
					return {
						title: value,
						description: prev.description,
						price: prev.price,
					};
				} else if (name === "description") {
					return {
						title: prev.title,
						description: value,
						price: prev.price,
					};
				} else if (name === "price") {
					return {
						title: prev.title,
						description: prev.description,
						price: value,
					};
				}
			});
		}
	};

	//store edit data
	const setvalEdit = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		//console.log(avater);
		console.log(EditProduct);

		if (name === "avater") {
			setavater(e.target.files[0]);
		} else {
			setEditProduct((prev) => {
				if (name === "title") {
					return {
						title: value,
						description: prev.description,
						price: prev.price,
					};
				} else if (name === "description") {
					return {
						title: prev.title,
						description: value,
						price: prev.price,
					};
				} else if (name === "price") {
					return {
						title: prev.title,
						description: prev.description,
						price: value,
					};
				}
			});
		}
	};


    //get data

	let unmount = true;
    useEffect(() => {
        axios.get('/product')
        .then(res => {
            if(unmount){
                setgetProduct(res.data.products)
                //console.log(getProduct)
            }
        })
        .catch(err => console.log(err));

		return(() => {
			unmount = false;
		})
    })

	//post data

	const postData = (e) => {
		e.preventDefault();

		const inputError = document.querySelectorAll("input.i-error");
		for (let i = 0; i < inputError.length; i++) {
			inputError[i].classList.remove("ei-error");
		}

		//e-placeholder

		const errorPlaceHolderAll = document.querySelectorAll("p.e-placeholder");
		for (let j = 0; j < errorPlaceHolderAll.length; j++) {
			errorPlaceHolderAll[j].textContent = "";
		}

		const newUSer = JSON.stringify(product);
		console.log(newUSer);
		const data = new FormData();
		data.append("user", newUSer);
		data.append("avater", avater);

		axios
			.post("/product", data)
			.then((res) => alert("Item Added Successfully"))
			.catch((err) => {
				//console.log(err.response.data.errors)
				const ree = err.response.data.errors;

				if (ree) {
					Object.keys(ree).forEach((errorname) => {
						//error placeholders
						//console.log(errorname)
						document.getElementById(`error-${errorname}`).textContent =
							ree[errorname].msg;

						// //input error
						const inputError = document.getElementById(`${errorname}`);
						inputError.classList.add("ei-error");
					});
				} else {
					console.log(err);
				}
			});
	};


	//edit product

	const openEdit = (value) => {
		//console.log(value);
		setEditProduct(() => {
			return({
				title: value.title,
				description: value.description,
				price: value.price,
			})
		});

		seteid(value._id);

	}
	const editProduct = (id) => {

		const newUSer = JSON.stringify(EditProduct);
		//console.log(newUSer);
		const data = new FormData();
		data.append("user", newUSer);
		data.append("avater", avater);

		//console.log(eid);
		

		axios.put(`/product/${eid}`, data)
		.then(res => console.log(res))
		.catch(err => {
			console.log(err.response)
		})
	}

	//delete product

	const delProduct = (id) => {
		axios.delete(`/product/${id}`)
		.then(res => console.log(res))
		.catch(err => console.log(err))
	}

	return (
		<section id='shop'>
			<div className='overly'>
			<div className="container">
				{/* <!-- Button trigger modal --> */}
				<div style={{ margin: "10px" }}>
					<h1 style={{ textAlign: "center" , color: 'white' }}>Welcome To Your Shop</h1>
					<button
						type="button"
						className="btn btn-primary"
						data-toggle="modal"
						data-target="#exampleModalLong"
						style={{marginBottom: '50px'}}
					>
						Add Meal
					</button>
				</div>

				{/* <!-- Modal --> */}
				<div
					className="modal fade"
					id="exampleModalLong"
					tabIndex="-1"
					role="dialog"
					aria-labelledby="exampleModalLongTitle"
					aria-hidden="true"
				>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">
									Add Product
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
								<form
									method="POST"
									onSubmit={postData}
									encType="multipart/form-data"
								>
									<div className="form-group">
										<label> Product Title</label>
										<input
											type="text"
											onChange={setval}
											name="title"
											className="form-control i-error"
											id="title"
											placeholder="eg: Athena meal"
										/>
										<p
											className="e-placeholder"
											id="error-title"
											style={{ color: "red", marginLeft: "15px" }}
										></p>
									</div>
									<div className="form-group">
										<label>Example textarea</label>
										<textarea
											className="form-control i-error"
											onChange={setval}
											name="description"
											id="description"
											placeholder="eg: Try our Beef Burger, a signature flame-grilled beef patty topped with a simple layer of crinkle cut pickles, yellow mustard, and ketchup on a toasted sesame seed bun"
											rows="3"
										></textarea>
										<p
											className="e-placeholder"
											id="error-description"
											style={{ color: "red", marginLeft: "15px" }}
										></p>
									</div>

									<div className="form-group">
										<label>Price</label>
										<input
											type="number"
											onChange={setval}
											name="price"
											className="form-control i-error"
											id="price"
											placeholder="$ Price"
										/>
										<p
											className="e-placeholder"
											id="error-price"
											style={{ color: "red", marginLeft: "15px" }}
										></p>
									</div>
									<div className="form-group">
										<label>Product Image</label>
										<input
											type="file"
											onChange={setval}
											name="avater"
											className="form-control"
											id="productImage"
										/>
										<p className="form-text text-muted">
											Only jpg, jpeg & png allowed.
										</p>
									</div>

									<div className="modal-footer">
										<button
											type="button"
											className="btn btn-secondary"
											data-dismiss="modal"
										>
											Close
										</button>
										<button type="submit" className="btn btn-primary">
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

            <div className='container '>
                <div className="row g-5 cardWrapper ">
                    {getProduct.map((value, index) => {
                        let productImg;
                        if(value.avater === null){
                            productImg = <div style={{height:'80px', width: '80px', background: 'red'}}></div>
                        } else{
                            productImg = <img style={{ marginBottom: '20px' , borderRadius: '3px'}} src={window.location.origin + `/productAvater/${value.avater}`} height='80px' width='80px' />
                        }
                        return(
                            <div className="col-sm-4">
                                <div className='cardX'>
                                    <div className="card-d">
										<div className="card-d-wi">
											<span style={{fontWeight: 'bold'}}>{value.title}</span><br/>
											<span style={{color: 'gray', width: 'auto'}}>{value.description}</span><br/>
											<span>tk {value.price}</span><br/>
										</div>
										<div style={{overflow: 'hidden', float: 'right'}}>
											{productImg}
										</div>
									</div>
								<div>

									{/* <!-- Button trigger modal --> */}
									<button onClick={() => openEdit(value)} type="button" className='card-b' data-toggle="modal" data-target="#exampleModal">
										<i className="far fa-edit"></i>
									</button>

									{/* <!-- Modal --> */}
									<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
									<div className="modal-dialog" role="document">
										<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div className="modal-body">
										<form
										method="POST"
										onSubmit={postData}
										encType="multipart/form-data"
									>
										<div className="form-group">
											<label> Product Title</label>
											<input
												type="text"
												onChange={setvalEdit}
												name="title"
												className="form-control i-error"
												placeholder="eg: Athena meal"
												value={EditProduct.title}
												required
											/>
											<p
												className="e-placeholder"
												style={{ color: "red", marginLeft: "15px" }}
											></p>
										</div>
										<div className="form-group">
											<label>Example textarea</label>
											<textarea
												className="form-control i-error"
												onChange={setvalEdit}
												name="description"
												placeholder="eg: Try our Beef Burger, a signature flame-grilled beef patty topped with a simple layer of crinkle cut pickles, yellow mustard, and ketchup on a toasted sesame seed bun"
												rows="3"
												value={EditProduct.description}
												required
											></textarea>
											<p
												className="e-placeholder"
												style={{ color: "red", marginLeft: "15px" }}
											></p>
										</div>

										<div className="form-group">
											<label>Price</label>
											<input
												type="number"
												onChange={setvalEdit}
												name="price"
												className="form-control i-error"
												placeholder="$ Price"
												value={EditProduct.price}
												required
											/>
											<p
												className="e-placeholder"
												style={{ color: "red", marginLeft: "15px" }}
											></p>
										</div>
										<div className="form-group">
											<label>Product Image</label>
											<input
												type="file"
												onChange={setvalEdit}
												name="avater"
												className="form-control"
											/>
											<p className="form-text text-muted">
												Only jpg, jpeg & png allowed.
											</p>
										</div>

										<p
										className="e-placeholder"
										style={{ color: "red", marginLeft: "15px" }}
										></p>

										{/* <div className="modal-footer">
											<button
												type="button"
												className="btn btn-secondary"
												data-dismiss="modal"
											>
												Close
											</button>
											<button type="submit" className="btn btn-primary">
												Submit
											</button>
										</div> */}
									</form>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
											<button type="button" onClick={() => editProduct(value._id)} className="btn btn-primary">Save changes</button>
										</div>
										</div>
									</div>
									</div>

									<button className='card-b' onClick={() => delProduct(value._id)}><i class="fas fa-trash"></i></button>
								</div>
                                </div>
								
                            </div>
                        )
                    })}
                </div>

            </div>
			</div>
		</section>
	);
};

export default AddProduct;
