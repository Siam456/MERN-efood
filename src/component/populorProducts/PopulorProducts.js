import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PopulorProducts.css";
import ShopCart from "../shopProducts/ShopCart";

const PopulorProducts = () => {
	const [product, setproduct] = useState([]);

	const [productDet, setproductDet] = useState({
		_id: "",
		title: "",
		description: "",
		price: "",
		avater: "",
		sellerA: {
			shopname: "",
			address: "",
		},
	});
	//avater source
	let source;
	let srcMI;

	//get products
	let unmout = true;
	useEffect(() => {
		axios
			.get("/product/all")
			.then((res) => {
				if (unmout) {
					setproduct(res.data.products);
					//console.log(product)
				}
			})
			.catch((err) => console.log(err));

		return () => {
			unmout = false;
		};
	}, [product]);

	//add cart

	const addcart = async (id, status, shop_id) => {
		alert("Added");
		//alert(status);
		var up = true;
		let body = {
			status: status,
		};

		try {
			const res = await axios.put(
				`http://localhost:3000/cart/${id}/${shop_id}`,
				body
			);

			if (up) {
				console.log(res);
			}
		} catch (err) {
			console.log(err);
		}
		return () => {
			up = false;
		};
	};

	//modal
	const openModal = (value) => {
		//console.log(value._id)
		axios
			.patch(`/product/0/${value._id}`)
			.then((res) => {})
			.catch((err) => console.log(err));
		setproductDet(value);
	};

	//search by location
	const [Searchlocation, setSearchlocation] = useState("All");

	const locationSearch = (e) => {
		setSearchlocation(e.target.value);
	};

	return (
		<div style={{ display: "flex" }}>
			<div className="populorProductDetails">
				<h2 className="container m-3">
					<i className="fas fa-fire-alt"></i> Populor Products
				</h2>
				<div className="container">
					<select
						onChange={locationSearch}
						className="form-select"
						aria-label="Default select example"
					>
						<option selected>All</option>
						<option value="Dhaka">Dhaka</option>
						<option value="Faridpur">Faridpur</option>
						<option value="Sadarpur">Sadarpur</option>
					</select>
				</div>

				<div className="containe">
					<div
						className="row my-5"
						style={{ alignItems: "center", justifyContent: "center" }}
					>
						{product.length !== 0 ? 
                            product.map((v, i) => {
                                if (
                                    Searchlocation === "All" ||
                                    v.sellerA.address === Searchlocation
                                ) {
                                    if (v.avater) {
                                        source =
                                            window.location.origin + `/productAvater/${v.avater}`;
                                    } else {
                                        source =
                                            "https://www.wallpapertip.com/wmimgs/86-867734_object-splashing-in-water.jpg";
                                    }
    
                                    let description = v.description.substring(0, 6);
                                    return (
                                        <div className="col-sm my-3">
                                            <div
                                                className="card"
                                                style={{
                                                    width: "17rem",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        height: "200px",
                                                        overflow: "hidden",
                                                        display: "flex",
                                                    }}
                                                >
                                                    <img className="card-img-top" src={source} alt="ss" />
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="card-title">
                                                        <ion-icon name="fast-food-outline"></ion-icon>{" "}
                                                        {v.title}
                                                    </h5>
                                                    <p className="card-text">
                                                        <ion-icon name="locate-outline"></ion-icon>{" "}
                                                        {v.sellerA.address}
                                                    </p>
                                                </div>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item text-muted">
                                                        {description}...
                                                    </li>
                                                    <li className="list-group-item">
                                                        <b>
                                                            <ion-icon name="pricetags-outline"></ion-icon> TK{" "}
                                                            {v.price}
                                                        </b>
                                                    </li>
                                                </ul>
                                                <div
                                                    className="card-body"
                                                    style={{
                                                        background: "#FB552F",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                    }}
                                                >
                                                    <span
                                                        onClick={() => openModal(v)}
                                                        data-toggle="modal"
                                                        data-target="#exampleModalLong"
                                                        className="pdetails"
                                                    >
                                                        <ion-icon
                                                            name="caret-forward-outline"
                                                            style={{ marginTop: "6px" }}
                                                        ></ion-icon>{" "}
                                                        View Details{" "}
                                                    </span>
                                                    <span
                                                        onClick={() => addcart(v._id, "add", v.sellerA.id)}
                                                        className="pdetailsCart"
                                                    >
                                                        <ion-icon
                                                            name="cart-outline"
                                                            style={{ marginTop: "6px" }}
                                                        ></ion-icon>
                                                    </span>
                                                </div>
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
                                                            <h5
                                                                className="modal-title"
                                                                id="exampleModalLongTitle"
                                                            >
                                                                Product Details
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
                                                            <div style={{ display: "none" }}>
                                                                {productDet.avater
                                                                    ? (srcMI =
                                                                            window.location.origin +
                                                                            `/productAvater/${productDet.avater}`)
                                                                    : (srcMI =
                                                                            "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80")}
                                                            </div>
    
                                                            <div style={{ textAlign: "center" }}>
                                                                <img src={srcMI} alt="siam" width="100%" />
                                                            </div>
                                                            <div
                                                                style={{
                                                                    marginTop: "10px",
                                                                    borderBottom: "1px gray dotted",
                                                                }}
                                                            >
                                                                <h5>
                                                                    <i className="fas fa-biohazard"></i>{" "}
                                                                    {productDet.sellerA.shopname}
                                                                </h5>
                                                                <span>
                                                                    <ion-icon
                                                                        name="locate-outline"
                                                                        style={{ marginTop: "6px" }}
                                                                    ></ion-icon>{" "}
                                                                    {productDet.sellerA.address}
                                                                </span>{" "}
                                                                <div style={{ height: "15px" }}></div>
                                                            </div>
                                                            <div className="container">
                                                                <h3 className="my-3">
                                                                    <i className="fas fa-pizza"></i>{" "}
                                                                    {productDet.title}
                                                                </h3>
                                                                <p
                                                                    className="text-muted"
                                                                    style={{ marginLeft: "10px" }}
                                                                >
                                                                    {" "}
                                                                    {productDet.description}
                                                                </p>
                                                                <p>
                                                                    <ion-icon name="pricetags-outline"></ion-icon>{" "}
                                                                    <b>
                                                                        {" "}
                                                                        <span> TK </span> {productDet.price}{" "}
                                                                    </b>
                                                                </p>
    
                                                                <div
                                                                    className="btn btn-danger"
                                                                    style={{ float: "right" }}
                                                                    data-dismiss="modal"
                                                                >
                                                                    <i
                                                                        className="fas fa-plus"
                                                                        onClick={() => addcart(productDet._id, "add")}
                                                                    >
                                                                        {" "}
                                                                        Add to cart
                                                                    </i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            })
                            : <div class="noProduct">No Products available</div>
                        }
					</div>
				</div>
			</div>

			<div>
				<ShopCart />
			</div>
		</div>
	);
};

export default PopulorProducts;
