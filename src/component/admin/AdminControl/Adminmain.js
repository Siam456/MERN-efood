import React, { useState } from "react";
import "./adminmain.css";
import AdminDisplay from "./adminDisplay";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Adminmain = () => {
	const [user, setuser] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		role: "admin",
		address: "Faridpur",
	});

	const [avater, setavater] = useState(null);

	//store data into state
	const setval = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		//console.log(user)

		if (name === "avater") {
			setavater(e.target.files[0]);
		} else {
			setuser((prev) => {
				if (name === "name") {
					return {
						name: value,
						email: prev.email,
						phone: prev.phone,
						password: prev.password,
						role: prev.role,
                        address: prev.address,
					};
				} else if (name === "email") {
					return {
						name: prev.name,
						email: value,
						phone: prev.phone,
						password: prev.password,
						role: prev.role,
                        address: prev.address,
					};
				} else if (name === "phone") {
					return {
						name: prev.name,
						email: prev.email,
						phone: value,
						password: prev.password,
						role: prev.role,
                        address: prev.address,
					};
				} else if (name === "password") {
					return {
						name: prev.name,
						email: prev.email,
						phone: prev.phone,
						password: value,
						role: prev.role,
                        address: prev.address,
					};
				} else if (name === "address") {
					return {
						name: prev.name,
						email: prev.email,
						phone: prev.phone,
						address: value,
						password: prev.password,
						role: prev.role,
					};
				}
			});
		}
	};

	//hhtp rq section
	//post data
	const postUser = (e) => {
		e.preventDefault();

		const errorPlaceHolder = document.querySelectorAll("p.ei-perror");
		for (let i = 0; i < errorPlaceHolder.length; i++) {
			errorPlaceHolder[i].textContent = "";
		}

		const newUSer = JSON.stringify(user);
		const data = new FormData();
		data.append("user", newUSer);
		data.append("avater", avater);

		axios
			.post("/user", data)
			.then((res) => console.log(res))
			.catch((err) => {
				console.log(err.response.data.errors);
				const re = err.response.data;

				Object.keys(re.errors).forEach((errorname) => {
					const errorPlaceholder = document.getElementById(
						`error-${errorname}`
					);
					errorPlaceholder.textContent = re.errors[errorname].msg;
				});
			});
	};

	//modal open
	const openModal = () => {
		//console.log('siam')
		const modal = document.getElementById("modala");
		const overlay = document.getElementById("overlay");
		modal.classList.add("active");
		overlay.classList.add("active");
	};

	//modal close
	const closeModal = () => {
		const modal = document.getElementById("modala");
		const modalEdit = document.getElementById("modaledit");

		const overlay = document.getElementById("overlay");
		modal.classList.remove("active");
		//modalEdit.classList.remove('active');
		overlay.classList.remove("active");
	};
	return (
		<>
			<div style={{ textAlign: "center" }}>
				<h1>
					Admin Panel -{" "}
					<span style={{ color: "#65629C" }}>eFood application</span>
				</h1>
				<button onClick={openModal} className="btn btn-primary">
					Add user
				</button>
			</div>
			<div className="modala" id="modala">
				<div className="modala-header">
					<div className="title">Add User</div>
					<button onClick={closeModal} className="close-button">
						&times;
					</button>
				</div>

				<div className="modala-body">
					<form method="POST" onSubmit={postUser} enctype="multipart/form-data">
						<input
							id="input-username"
							onChange={setval}
							className="form-control"
							type="text"
							name="name"
							placeholder="Name"
						></input>
						<p id="error-name" className="ei-perror"></p> <br></br>
						<input
							id="input-email"
							onChange={setval}
							className="form-control"
							type="text"
							name="email"
							placeholder="Email"
						></input>
						<p id="error-email" className="ei-perror"></p>
						<br></br>
						<input
							id="input-phone"
							onChange={setval}
							className="form-control"
							type="text"
							name="phone"
							placeholder="Phone"
						></input>
						<p id="error-phone" className="ei-perror"></p>
						<br></br>
						<input
							id="input-password"
							onChange={setval}
							className="form-control"
							type="password"
							name="password"
							placeholder="Password"
						></input>
						<p id="error-password" className="ei-perror"></p> <br></br>
						<div className="form-group" style={{ position: "relative" }}>
							<label className="form-text text-muted" for="address">
								Address
							</label>
							<select
								className="form-select"
								name="address"
								id="address"
								onChange={setval}
							>
								<option value="Faridpur">Faridpur</option>
								<option value="Dhaka">Dhaka</option>
								<option value="Sadarpur">Sadarpur</option>
							</select>
						</div>{" "}
						<br />
						<div className="form-group">
							<label for="exampleFormControlFile1">Choose file</label>
							<input
								type="file"
								name="avater"
								onChange={setval}
								class="form-control-file"
							/>
						</div>
						<p style={{ textAlign: "left", fontWeight: "bold" }}>Select Role</p>
						<select
							onChange={(e) => {
								const value = e.target.value;
								setuser((prev) => {
									return {
										name: prev.name,
										email: prev.email,
										phone: prev.phone,
										password: prev.password,
										role: value,
                                        address: prev.address,
									};
								});
								//console.log(user)
							}}
							name="role"
							className="form-select"
						>
							<option value="admin" defaultValue>
								Admin
							</option>
							<option value="user">User</option>
						</select>{" "}
						<br></br>
						<input
							className="btn btn-primary"
							type="submit"
							value="Add User"
						></input>
					</form>
				</div>
			</div>
			<div id="overlay"></div>

			{/* show table */}

			<AdminDisplay />
		</>
	);
};

export default Adminmain;
