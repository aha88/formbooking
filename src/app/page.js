'use client'
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { CButton, CContainer } from "@coreui/react";
import Form from "./component/Form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { apiservice } from "@/service/api";
import Swal from 'sweetalert2';

function htmlDecode(input) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [moviesDes, setMoviesDes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    movieList: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    if(name=="movieList"){
      setMoviesDes(movies[e.target.id]?.extdata.movieinfo.synopsis)
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const data = await apiservice();
      setMovies(data.movies);
      setLoading(false);
    };

    fetchMovies();
  }, []);

 

   
  const handleSubmit = () => {
 

    return Swal.fire({
      title: `Hi ${formData.name || "Guess" }!`,
      text: 'Your Event has been booked',
      html:`<table>
      <tr>${formData.name}<br/>
        ${formData.phone}<br/>
        ${formData.email}<br/>
        ${formData.date}<br/>
        ${formData.movieList}<br/>
      </tr></table>`,
      icon: 'success',  
      confirmButtonText: 'OK',
    });    
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <CContainer className="d-flex flex-column justify-content-center align-items-center ">
          <div className="border-1 shadow p-5 rounded vw-70">
            <h2 className="text-center fw-bold">Birthday Event</h2>
            {movies.length > 0 && (
              <>
              <Form
                required
                label="Name"
                name="name"
                type="text"
                placeholder="Enter your name"
                onChange={(e) => handleInputChange(e)}
                classname='mb-2 form-control'
              />
              <Form
                required
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                onChange={(e) => handleInputChange(e)}
                classname='mb-2 form-control'
              />
              <Form
                required
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => handleInputChange(e)}
                classname='mb-2 form-control'
              />
            <hr/>
              <Form
                required
                label="Date Event"
                name="date"
                type="date"
                placeholder="Enter your email"
                onChange={(e) => handleInputChange(e)}
                classname='mb-2 form-control'
              />
              <Form
                required
                label="Movie List"
                name="movieList"
                type="select"
                placeholder="Select an option"
                options={movies.map((movie,i) => ({
                  value: movie.name,
                  label: movie.name,
                  id: i,
                  image: movie.assets[4].extdata.fileinfo
                }))}
                onChange={(e) => handleInputChange(e)}
              />
              <p className="des"><strong>Description:</strong><br/>{ htmlDecode(moviesDes) || "description not available."}</p>
              <div className="text-center mt-3">
                <CButton color="primary" onClick={handleSubmit}>
                  Submit
                </CButton>
              </div>
              </>
            )}
          </div>
        </CContainer>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
