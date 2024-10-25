import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './edit.css'

function Edit() {
  const [data, setData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    subject: '',
  });
  const [grades, setGrades] = useState({
    math_grade: '',
    science_grade: '',
    programming_grade: '',
    dsa_grade: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/get_student/${id}`)
      .then((res) => {
        const student = res.data[0];
        if (student) {
          setData({
            name: student.name,
            email: student.email,
            age: student.age,
            gender: student.gender,
            subject: student.subject || '',
          });

          setGrades({
            math_grade: student.math_grade || '',
            science_grade: student.science_grade || '',
            programming_grade: student.programming_grade || '',
            dsa_grade: student.dsa_grade || '',
          });
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    const subject = data.subject;
    const grade = grades[`${subject.toLowerCase()}_grade`];

    // If a subject is selected, ensure the grade is provided
    if (subject && !grade) {
      console.error("Grade is required for the selected subject");
      return;
    }

    const updatedValues = {
      name: data.name,
      email: data.email,
      age: data.age,
      gender: data.gender,
      subject: data.subject,
      ...grades,
    };

    axios
      .post(`/edit_user/${id}`, updatedValues)
      .then((res) => {
        navigate("/home");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  const handleGradeChange = (subject, value) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [`${subject.toLowerCase()}_grade`]: value,
    }));
  };

  function handlePictureUpload(e) {
    const formData = new FormData();
    formData.append('picture', e.target.files[0]);

    axios
      .post(`/upload_picture/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid vw-100 vh-100 d-flex flex-column align-items-center justify-content-center Edit">
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
          <label htmlFor="name">Name</label>
          <input
            value={data.name}
            type="text"
            name="name"
            required
            onChange={(e) => setData((prevData) => ({ ...prevData, name: e.target.value }))}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email</label>
          <input
            value={data.email}
            type="email"
            name="email"
            required
            onChange={(e) => setData((prevData) => ({ ...prevData, email: e.target.value }))}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="gender">Gender</label>
          <input
            value={data.gender}
            type="text"
            name="gender"
            required
            onChange={(e) => setData((prevData) => ({ ...prevData, gender: e.target.value }))}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="age">Age</label>
          <input
            value={data.age}
            type="number"
            name="age"
            required
            onChange={(e) => setData((prevData) => ({ ...prevData, age: e.target.value }))}
          />
        </div>
        <div className="form-group my-3 d-flex align-items-center">
          <div className="flex-fill me-2">
            <label htmlFor="subject">Select Subject</label>
            <select
              name="subject"
              className="form-control"
              onChange={(e) => setData((prevData) => ({ ...prevData, subject: e.target.value }))}
              value={data.subject || ''}
            >
              <option value="">Select a subject</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="Programming">Programming</option>
              <option value="DSA">Data Structures and Algorithms</option>
            </select>
          </div>
          {data.subject && (
            <div className="flex-fill">
              <label htmlFor="grade">Enter Grade</label>
              <input
                type="number"
                name="grade"
                placeholder="Grade"
                onChange={(e) => handleGradeChange(data.subject, e.target.value)}
                value={grades[`${data.subject.toLowerCase()}_grade`] || ''}
                min="0"
              />
            </div>
          )}
        </div>
        <div className="form-group my-3">
          <button type="submit" className="btn btn-success">Save</button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
