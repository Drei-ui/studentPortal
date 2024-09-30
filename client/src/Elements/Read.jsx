import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import './read.css';

function Read() {
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
  return (
    <div className="Read container-fluid vw-100 vh-100 d-flex flex-column align-items-center justify-content-center ">
            <h1 className="text-white mb-4">User {id}</h1>
            <Link to="/home" className="btn btn-success mb-4">Back</Link>
            <div className="user-details">
                {data.map((student) => (
                    <ul className="list-group" key={student.id}>
                        <li className="list-group-item">
                            <b>ID: </b>
                            {student["id"]}
                        </li>
                        <li className="list-group-item">
                            <b>Name: </b>
                            {student["name"]}
                        </li>
                        <li className="list-group-item">
                            <b>Email: </b>
                            {student["email"]}
                        </li>
                        <li className="list-group-item">
                            <b>Age: </b>
                            {student["age"]}
                        </li>
                        <li className="list-group-item">
                            <b>Gender: </b>
                            {student["gender"]}
                        </li>
                    </ul>
                ))}
            </div>
        </div>
  );
}

export default Read;