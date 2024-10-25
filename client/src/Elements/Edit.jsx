import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './edit.css'

function Edit() {
  const [data, setData] = useState([]);
  const [grades, setGrades] = useState({
    math_grade: '',
    science: '',
    programming: '',
    dsa_grade: '',
  })
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/get_student/${id}`)
      .then((res) => {
        setData(res.data);

      const student = res.data[0];
      if(student){
        setGrades({
          math_grade: student.math_grade || null,
          science: student.science_grade || null,
          programming: student.programming_grade || null,
          dsa: student.dsa_grade || null,
        })
      }
      })
      .catch((err) => console.log(err));
  }, [id]);

  

  function handleSubmit(e) {
    e.preventDefault();

    const subject = data[0].subject;

    if(!subject){
      console.error("Subject is undefined");
      return;
    }
    const updatedValues = {
      name: data[0].name,
      email: data[0].email,
      age: data[0].age,
      gender: data[0].gender,
      ...grades
    };

    axios
      .post(`/edit_user/${id}`, updatedValues)
      .then((res) => {
        navigate("/home");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  const handleGradeChange = (subject, value) =>{
    setGrades(prevGrades => ({
      ...prevGrades,
      [`${subject.toLowerCase()}_grade`]:value
    }))
  }

  function handlePictureUpload(e) {
    const formData = new FormData();
    formData.append('picture', e.target.files[0]);

    axios
    .post(`/upload_picture/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
  }
  return (
    <div className="container-fluid vw-100 vh-100 d-flex flex-column align-items-center justify-content-center Edit">
            {data.map((student) => (   
                <form onSubmit={handleSubmit} className="user-form">
                  <Link to="/home" className="btn btn-success mb-4">Back</Link>
                    <div className="form-group my-3">
                        <label htmlFor="email">Upload Picture</label>
                        <input
                            type="file"
                            name="picture"
                            onChange={handlePictureUpload}
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="email">Name</label>
                        <input
                            value={student.name}
                            type="name"
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
                    <div className="form-group my-3 d-flex align-items-center">
                        <div className="flex-fill me-2">
                            <label htmlFor="subject">Select Subject</label>
                            <select
                                name="subject"
                                className="form-control"
                                onChange={(e) => setData([{ ...data[0], subject: e.target.value }])}
                                value={student.subject || ''}
                            >
                                <option value="">Select a subject</option>
                                <option value="Math">Math</option>
                                <option value="Science">Science</option>
                                <option value="Programming">Programming</option>
                                <option value="DSA">Data Structures and Algorithms</option>
                            </select>
                        </div>
                        <div className="flex-fill">
                            <label htmlFor="grade">Enter Grade</label>
                            <input
                                type="number"
                                name="grade"
                                placeholder="Grade"
                                required
                                onChange={(e) => handleGradeChange(student.subject, e.target.value)}
                                value={grades[`${student.subject?.toLowerCase()}_grade`] || ''}
                                min="0" 
                            />
                        </div>
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
