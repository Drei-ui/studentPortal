import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './edit.css'

function Edit() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`/get_student/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`/edit_user/${id}`, data[0])
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid vw-100 vh-100 d-flex flex-column align-items-center justify-content-center Edit">
            <h1 className="text-white mb-4">User {id}</h1>
            <Link to="/" className="btn btn-success mb-4">Back</Link>
            {data.map((student) => (
                <form onSubmit={handleSubmit} className="user-form">
                    <div className="form-group my-3">
                        <label htmlFor="name">Name</label>
                        <input
                            value={student.name}
                            type="text"
                            name="name"
                            required
                            onChange={(e) => setData([{ ...data[0], name: e.target.value }])}
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="email">Email</label>
                        <input
                            value={student.email}
                            type="email"
                            name="email"
                            required
                            onChange={(e) => setData([{ ...data[0], email: e.target.value }])}
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="gender">Gender</label>
                        <input
                            value={student.gender}
                            type="text"
                            name="gender"
                            required
                            onChange={(e) => setData([{ ...data[0], gender: e.target.value }])}
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="age">Age</label>
                        <input
                            value={student.age}
                            type="number"
                            name="age"
                            required
                            onChange={(e) => setData([{ ...data[0], age: e.target.value }])}
                        />
                    </div>
                    <div className="form-group my-3">
                        <button type="submit" className="btn btn-success">Save</button>
                    </div>
                </form>
            ))}
        </div>
  );
}

export default Edit;