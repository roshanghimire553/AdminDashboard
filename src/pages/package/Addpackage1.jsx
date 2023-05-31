import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "antd";

import api from "../../api";
import axios from "axios";

export const AddPackage1 = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    description: "",
    price: "",
    photo: null,
    maxGroupSize: "",
  });

  //api for storing tour data//

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("city", formData.city);
      data.append("address", formData.address);
      data.append("distance", formData.distance);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("photo", formData.photo);
      data.append("maxGroupSize", formData.maxGroupSize);
      console.log(formData);
      debugger;

      const res = await axios.post(
        "http://localhost:5000/api/tour/create",

        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to FormData
          },
        }
      );

      //   const response = await axios.post('https://example.com/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data', // Set the content type to FormData
      //   },
      // });

      if (res) {
        setFormData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //getting category list//
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    api
      .get("category/Get")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {});
  }, []);

  // const handleFileChange = ({ fileList }) => {
  //   setFileList(fileList);
  // };

  const handleFileChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Modal
      visible={visible}
      title="Data Form"
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Form form={form} initialValues={formData}>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="distance">Distance</label>
            <input
              type="number"
              className="form-control"
              id="distance"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Photo</label>
            <input
              type="file"
              className="form-control"
              id="photo"
              name="photo"
              value={formData.photo}
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxGroupSize">Max Group Size</label>
            <input
              type="number"
              className="form-control"
              id="maxGroupSize"
              name="maxGroupSize"
              value={formData.maxGroupSize}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              className="form-control"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>

              {categories?.map((item) => {
                return (
                  <option key={item._id} value={item._id}>
                    {item?.name}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </Form>
    </Modal>
  );
};
