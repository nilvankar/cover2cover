import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1 className="mb-4">About BookRec</h1>
        
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">Our Mission</h2>
                <p className="card-text">
                  At BookRec, we believe that everyone deserves to find books they'll love. 
                  Our mission is to connect readers with their perfect next read using 
                  advanced recommendation algorithms and community insights.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">How It Works</h2>
                <p className="card-text">
                  Our system analyzes your reading preferences, ratings, and behavior to 
                  suggest books tailored just for you. The more you use BookRec, the 
                  better our recommendations become.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title">Meet the Team</h2>
            <div className="row">
              <div className="col-md-4 text-center mb-3">
                <img 
                  src="https://via.placeholder.com/150" 
                  className="rounded-circle mb-2" 
                  alt="Team member" 
                />
                <h4>John Doe</h4>
                <p className="text-muted">Founder & CEO</p>
              </div>
              <div className="col-md-4 text-center mb-3">
                <img 
                  src="https://via.placeholder.com/150" 
                  className="rounded-circle mb-2" 
                  alt="Team member" 
                />
                <h4>Jane Smith</h4>
                <p className="text-muted">Lead Developer</p>
              </div>
              <div className="col-md-4 text-center mb-3">
                <img 
                  src="https://via.placeholder.com/150" 
                  className="rounded-circle mb-2" 
                  alt="Team member" 
                />
                <h4>Mike Johnson</h4>
                <p className="text-muted">Data Scientist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;