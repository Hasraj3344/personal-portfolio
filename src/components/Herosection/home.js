import React from 'react';
import { Link } from 'react-router-dom';
import './css/home.css'; // Ensure you style it properly

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      
        <div className="section-content">
        <h2>Hi, I'm <span>Neelam Haswanth Rajesh</span> </h2>
        <h4>Data Engineer</h4>
        <p>Results-driven Data Engineer with a strong background in designing, developing, and optimizing data pipelines,
            databases, and ETL processes. Proficient in SQL, Python, and big data technologies, with hands-on experience in
            data warehousing, data transformation, and performance tuning. Passionate about building scalable and efficient 
            data solutions to drive business decisions. Seeking to contribute my expertise in a dynamic and innovative environment.</p>
        <div class="btn-group">
            <a href="#">Hire Me</a>
            <a href="#">See Projects</a>
        </div>
    </div>

      
      
    </div>
  );
};

export default Home;
