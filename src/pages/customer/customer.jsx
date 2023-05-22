import React, { useEffect, useState } from "react";
import { Sidemenu } from "../../components/sidemenu/sidemenu";
import { Header } from "../../components/header/header";
import api from "../../api";

export const Customer = () => {
  const [user, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const res = await api.get("user/getUsers");
      if (res) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const DeleteUser = async (id) => {
    try {
      const res = await api.delete(`/user/deleteUsers/${id}`);

      if (res.data) {
        fetchUsers();
        console.log("User deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Sidemenu />
      <section style={{ marginLeft: "360px" }}>
        <div className="row ">
          <div className="col-10 ">
            <div className="card ">
              <div className="card-body ">
                <h4 className="card-title">Customer details</h4>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>SNo</th>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.length > 0 &&
                        user.map((userData, id) => {
                          return (
                            <>
                              <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{userData.name}</td>
                                <td>{userData.email}</td>
                                <td>{userData.role}</td>
                                <button
                                  className="btn btn-danger bg-primary custom-small-btn"
                                  style={{
                                    fontSize: "12px",
                                    padding: " 4px 8px",
                                  }}
                                  onClick={() => {
                                    DeleteUser(userData?._id);
                                  }}
                                >
                                  <td>Delete</td>
                                </button>
                              </tr>
                            </>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
