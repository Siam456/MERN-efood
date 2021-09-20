import axios from "axios";
import React, { useEffect, useState } from "react";
import noPhoto from './nophoto.png'

const AdminDisplay = () => {
  const [user, setuser] = useState([]);

  const [editUser, seteditUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "admin",
    address: "Faridpur",
  });

  const [avater, setavater] = useState(null);

  const [editID, seteditID] = useState("");

  // for edit store data
  const setvalEdit = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    //console.log(editUser)

    if (name === "avater") {
      setavater(e.target.files[0]);
      //console.log(e.target.files[0])
    } else {
      seteditUser((prev) => {
        if (name === "name") {
          return {
            name: value,
            email: prev.email,
            phone: prev.phone,
            password: prev.password,
            role: prev.role,
          };
        } else if (name === "email") {
          return {
            name: prev.name,
            email: value,
            phone: prev.phone,
            password: prev.password,
            role: prev.role,
          };
        } else if (name === "phone") {
          return {
            name: prev.name,
            email: prev.email,
            phone: value,
            password: prev.password,
            role: prev.role,
          };
        } else if (name === "password") {
          return {
            name: prev.name,
            email: prev.email,
            phone: prev.phone,
            password: value,
            role: prev.role,
          };
        }else if (name === "address") {
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

  //display user
  useEffect(() => {
    axios
      .get("/user")
      .then((res) => {
        setuser(res.data.users);
      })
      .catch((err) => console.log(err));
    return () => {
      //console.log('done')
    };
  });

  //edit user
  const editUserModal = (data) => {
    seteditID(data._id);
    seteditUser(() => {
      return {
        name: data.name,
        email: data.email,
        phone: data.phone,
      };
    });

    const modal = document.getElementById("modaledit");
    const overlay = document.getElementById("overlay");
    modal.classList.add("active");
    overlay.classList.add("active");
  };

  //edit user
  const editUserSubmit = (e) => {
    //console.log(editUser)
    e.preventDefault();
    const newUSer = JSON.stringify(editUser);
    const data = new FormData();
    data.append('user', newUSer);
    data.append('avater', avater);
    for (var value of data.values()) {
        console.log(value);
     }

    axios.put(`/user/${editID}`, data)
    .then(res => alert('successfully updated'))
    .catch(err => {
      //console.log(err.response.data.errors)
      const re = err.response.data;
      if(err.response.data.errors){
        Object.keys(re.errors).forEach(errorname => {
          alert('update failed');
          document.querySelector('p.gen-error').textContent = re.errors[errorname].msg;
        
      })
      } else{ 
        alert('successfully updated');
      }
      
    })
  }

  //delete user

  const deleteUser = (id) => {
    axios
      .delete(`/user/${id}`)
      .then((res) => {
        alert("Delete Successfully");
      })
      .catch((err) => console.log(err));
  };

  //modal close
  const closeModal = () => {
    const modal = document.getElementById("modala");
    const modalEdit = document.getElementById("modaledit");

    const overlay = document.getElementById("overlay");
    modal.classList.remove("active");
    modalEdit.classList.remove("active");
    overlay.classList.remove("active");
  };

  return (
    <div>
      <div
        className="table-wraper"
        style={{ overflowX: "auto", padding: "30px", textAlign: "center" }}
      >
        <h3>All Users</h3>
      
        <table
          className="table table-hover table-striped mt-5"
          style={{ borderCollapse: "collapse" , overflowX : 'auto'}}
        >
          <thead className="bg-secondary">
            <tr>
              <th scope="col">#</th>
              <th
                style={{ textAlign: "left", paddingLeft: "50px" }}
                scope="col"
              >
                User
              </th>
              <th scope="col">Joining Date</th>
              <th scope="col">Status</th>
              <th style={{ paddingLeft: "20px" }} scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {user.map((data, index) => {
              //  joining date
              let d = data.createdAt;
              let date = new Date(d);
              let formattedDate = date.toDateString();

              let sour;
              if(data.avater){
                sour = <img style={{ borderRadius: '50%', marginRight: '30px'}} src={window.location.origin + `/userUpload/${data.avater}`} height='80px' /> 
              } else {
                sour = <img style={{ borderRadius: '50%', marginRight: '30px'}} src={noPhoto} height='80px' /> 
              }

              return (
                <tr key={index}>
                  <th style={{ verticalAlign: "middle" }} scope="row">{index + 1}</th>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "left",
                      paddingLeft: "50px",
                    }}
                  >
                    <div style={{float: 'left'}}>{sour}</div>
                    <div  style={{float: 'left'}}>
                      <span style={{ color: "#6564A2", fontWeight: "bold" }}>
                        {data.name}{" "}
                      </span>
                      <br></br>
                      <span style={{ padding: "1px" }}>
                        <i className="fas fa-envelope"></i> {data.email}
                      </span>
                      <br></br>
                      <span style={{ padding: "1px" }}>
                        <i className="fas fa-phone-alt"></i> {data.phone}
                      </span>
                      <br></br>
                      <span style={{ padding: "1px" }}>
                        <i className="fas fa-map-marked-alt"></i> {data.address}
                      </span>
                    </div>
                  </td>

                  <td style={{ verticalAlign: "middle" }}>{formattedDate}</td>

                  <td style={{ verticalAlign: "middle" }}>{data.role}</td>
                  <td style={{ verticalAlign: "middle" ,width: '200px'}}>
                    <button
                      style={{ marginRight: "10px" }}
                      type="button"
                      onClick={() => editUserModal(data)}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>

                    {/* edit modal */}

                    <div className="modala" id="modaledit">
                      <div className="modala-header">
                        <div className="title">Edit User</div>
                        <button onClick={closeModal} className="close-button">
                          &times;
                        </button>
                      </div>
                      <div className="modala-body">
                        <form method="POST" onSubmit={editUserSubmit}  enctype='multipart/form-data'>
                          <input
                            onChange={setvalEdit}
                            value={editUser.name}
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Name"
                          ></input> <br></br>
                          
                          <input
                            onChange={setvalEdit}
                            value={editUser.email}
                            className="form-control"
                            type="text"
                            name="email"
                            placeholder="Email"
                          ></input> <br></br>
                          
                          <input
                            onChange={setvalEdit}
                            value={editUser.phone}
                            className="form-control"
                            type="text"
                            name="phone"
                            placeholder="Phone"
                          ></input> <br></br>
                          <div className="form-group" style={{ position: "relative" }}>
                            <label className="form-text text-muted" for="address">
                              Address
                            </label>
                            <select
                              className="form-select"
                              name="address"
                              id="address"
                              onChange={setvalEdit}
                            >
                              <option value="Faridpur">Faridpur</option>
                              <option value="Dhaka">Dhaka</option>
                              <option value="Sadarpur">Sadarpur</option>
                            </select>
                          </div>{" "}
                          <br />
                          
                          <div className="form-group">
                            <input
                              type="file"
                              onChange={setvalEdit}
                              name="avater"
                              className="form-control-file"
                            />
                          </div> <br></br>
                          <p style={{ textAlign: "left", fontWeight: "bold" }}>
                            Select Role
                          </p>
                          <select
                            onChange={(e) => {
                              const value = e.target.value;
                              seteditUser((prev) => {
                                return {
                                  name: prev.name,
                                  email: prev.email,
                                  phone: prev.phone,
                                  password: prev.password,
                                  role: value,
                                };
                              });
                              //console.log(editUser)
                            }}
                            name="role"
                            className="form-select"
                          >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </select>{" "}
                          {/* <p style={{ textAlign: "left", fontWeight: "bold" }}>
                            Check Admin:{" "}
                          </p>
                          <input
                            onChange={setvalEdit}
                            value={editUser.password}
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Enter Admin Password Please"
                          ></input>{" "}
                          <br></br> */}
                          <p style={{color: 'red'}} className='gen-error'></p>
                          <br></br>
                          <input
                            onChange={setvalEdit}
                            onClick={closeModal}
                            className="btn btn-primary"
                            type="submit"
                            value="Edit user"
                          ></input>
                        </form>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteUser(data._id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDisplay;
