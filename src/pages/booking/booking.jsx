import { Header } from "../../components/header/header";
import api from "../../api";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sidemenu } from "../../components/sidemenu/sidemenu";

export const Booking = () => {
  const [Booking, setBooking] = useState([]);
  const fetchBooking = async () => {
    try {
      const res = await api.get("Booking/AllBooking");
      if (res) {
        setBooking(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBooking();
  }, []);

  const DeleteBooking = async (id) => {
    try {
      const res = await api.delete(`Booking/DeleteBooking/${id}`);
      if (res.data) {
        fetchBooking();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Sidemenu />

      <ToastContainer />

      <section style={{ marginLeft: "270px" }}>
        <div className="row ">
          <div className="col-15 ">
            <div className="card ">
              <div className="card-body ">
                <h4 className="card-title">Booking details</h4>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>SNo</th>
                        <th>Tour ID</th>
                        <th>User ID</th>
                        <th>FullName</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>GuestSize</th>
                        <th>Tour Name</th>
                        <th>Book Date</th>
                        <th>Total Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Booking.length > 0 &&
                        Booking.map((BookingData, id) => {
                          return (
                            <>
                              <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{BookingData.tourId}</td>
                                <td>{BookingData.userId}</td>
                                <td>{BookingData.fullName}</td>
                                <td>{BookingData.userEmail}</td>
                                <td>{BookingData.phoneNumber}</td>
                                <td>{BookingData.guestSize}</td>
                                <td>{BookingData.tourName}</td>
                                <td>{BookingData.bookAt}</td>
                                <td>{BookingData.totalPrice}</td>
                                <td>
                                  <button
                                    className="btn btn-danger  custom-medium-btn"
                                    style={{
                                      fontSize: "12px",
                                      padding: " 4px 8px",
                                    }}
                                    onClick={() => {
                                      DeleteBooking(BookingData?._id);
                                    }}
                                  >
                                    Delete
                                  </button>
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
