import React, { useEffect, useState } from "react";
import { Sidemenu } from "../../components/sidemenu/sidemenu";
import { Header } from "../../components/header/header";
import api from "../../api";
// import { AddPackage } from "./addPackage";
import { Button } from "antd";
import { AddPackage1 } from "./Addpackage1";
export const Packages = () => {
  //for fetching category in list//

  //for fetching tours card//

  const [Tour, setTours] = useState([]);
  const fetchTours = async () => {
    try {
      const res = await api.get("tour/");

      if (res) {
        setTours(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTours();
  }, []);

  //for deleting card packeges//

  const Deletecard = async (id) => {
    try {
      const Del = await api.delete(`tour/${id}`);
      if (Del.data) {
        fetchTours();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //for updating card packages
  //this is for modal form button//
  // const [modalVisible, setModalVisible] = useState(false);

  // const handleOpenModal = () => {
  //   setModalVisible(true);
  // };

  // const handleCancelModal = () => {
  //   setModalVisible(false);
  // };

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
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
                <h4 className="card-title">Package details</h4>
                <div>
                  <Button type="primary" onClick={handleOpenModal}>
                    Open Modal
                  </Button>
                  <AddPackage1
                    visible={modalVisible}
                    onClose={handleCloseModal}
                  />
                </div>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>SNo</th>
                        <th>Title</th>
                        <th>City</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>No of people</th>
                        <th>Category</th>
                        <th>Images</th>
                        <th colSpan="2" className="text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {/* {JSON.stringify(Tour)} */}
                    <tbody>
                      {Tour.length > 0 &&
                        Tour?.map((TourData, id) => {
                          console.log(TourData, "sdukhf");
                          return (
                            <>
                              <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{TourData.title}</td>
                                <td>{TourData.city}</td>
                                <td>{TourData.desc}</td>
                                <td>{TourData.price}</td>
                                <td>{TourData.maxGroupSize}</td>
                                <td>{TourData.category.name}</td>

                                <td>
                                  <img
                                    className="img-fluid img-thumbnail rounded-pill"
                                    style={{ maxWidth: "70px" }}
                                    src={TourData.photo.url}
                                    alt="hello"
                                  />
                                </td>

                                <td
                                  style={{
                                    fontSize: "8px",
                                    padding: " 10px 15px",
                                  }}
                                >
                                  <td>
                                    <button
                                      className="btn btn-danger  custom-medium-btn"
                                      style={{
                                        fontSize: "12px",
                                        padding: " 4px 8px",
                                      }}
                                      onClick={() => {
                                        Deletecard(TourData?._id);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-primary bg-primary custom-small-btn"
                                      style={{
                                        fontSize: "12px",
                                        padding: " 4px 8px",
                                      }}
                                      onClick={() => {}}
                                    >
                                      update
                                    </button>
                                  </td>
                                </td>
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
