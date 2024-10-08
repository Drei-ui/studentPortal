import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios.get('/students')
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [deleted]);

  function handleDelete(id) {
    axios.delete(`/delete/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => console.log(err));
  }

  // Handle search input changes
  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  // Filter data based on search term (case insensitive) for both Name and ID
  const filteredData = data.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toString().includes(searchTerm)
  );

  return (
    <div className="container-fluid vh-100 vw-100 Home">
      {/* Topbar */}
      <div className="topbar">
        <h3 className="text-center mb-4">Student Portal</h3>
        <div className="topbar-links">
          <Link className="btn btn-secondary" to="/create">Add Student</Link>
          <Link className="btn btn-secondary" to="/">Logout</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th colSpan="10" className="search-container">
                {/* Search bar aligned to the right */}
                <input 
                  type="text" 
                  placeholder="Search by name or ID..." 
                  value={searchTerm} 
                  onChange={handleSearchChange} 
                  className="form-control search-bar"
                />
              </th>
            </tr>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                  <td>
                    <Link className="btn btn-info mx-1" to={`/read/${student.id}`}>Read</Link>
                    <Link className="btn btn-warning mx-1" to={`/edit/${student.id}`}>Edit</Link>
                    <button onClick={() => handleDelete(student.id)} className="btn btn-danger mx-1">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
