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

  const computeAverageGrade = (student) => {
    const grades = [
      student.math_grade,
      student.science_grade,
      student.programming_grade,
      student.dsa_grade,
    ].filter(grade => grade !== null && grade !== '' && grade !== 0);

    if(grades.length === 0){
      return "N/A";
    }
      const totalGrade = grades.reduce((acc,curr) => acc + Number(curr), 0);
      return (totalGrade / grades.length).toFixed(2);
  };
  return (
    <div className="Read container-fluid vw-100 vh-100 d-flex flex-column align-items-center justify-content-center ">
      
      <div className="user-details">
      <Link to="/home" className="btn btn-success mb-4">Back</Link>
        {data.map((student) => {
          // Replace backslashes with forward slashes for URL compatibility
          const imagePath = student.image.replace(/\\/g, '/'); // Correct backslashes
          console.log("Student Image Path:", imagePath); // Log the corrected image path
          const averageGrade = computeAverageGrade(student);
          console.log(averageGrade);
          return (
            <div key={student.id}>
              {student.image && (
                <div className="image-container">
                    <img
                    src={`/${imagePath}`}
                    alt={`${student.name}'s profile`}
                    className="profile-picture mb-3"
                    style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
                    />
                </div>
                
              )}
              <ul className="list-group">
                <li className="list-group-item">
                  <b>ID: </b>
                  {student.id}
                </li>
                <li className="list-group-item">
                  <b>Name: </b>
                  {student.name}
                </li>
                <li className="list-group-item">
                  <b>Email: </b>
                  {student.email}
                </li>
                <li className="list-group-item">
                  <b>Age: </b>
                  {student.age}
                </li>
                <li className="list-group-item">
                  <b>Gender: </b>
                  {student.gender}
                </li>
                <div className="text-black justify-content-center d-flex mt-3">
                  <h3>Grades</h3>
                </div>
                <div className=" list-group-item align-items-center d-flex">
                  <li className="list-group-item">
                      <b>Math: </b>
                      {student.math_grade}
                  </li>
                  <li className="list-group-item">
                      <b>Science: </b>
                      {student.science_grade}
                  </li>
                  <li className="list-group-item">
                      <b>Programming: </b>
                      {student.programming_grade}
                  </li>
                  <li className="list-group-item">
                      <b>DSAnalgo: </b>
                      {student.dsa_grade}
                  </li>
                </div>
                <div className="text-black justify-content-center d-flex mt-3">
                  <li className="list-group-item">
                      <b>Average Grade: </b>
                      {averageGrade}
                  </li>
                </div>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Read;