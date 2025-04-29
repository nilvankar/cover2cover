import React from 'react';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="mb-4">Contact Us</h1>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">Get in Touch</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input type="text" className="form-control" id="subject" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows="5" required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">Contact Information</h2>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <h5><i className="bi bi-geo-alt-fill me-2"></i> Address</h5>
                    <p>123 Book Street, Readville, RV 12345</p>
                  </li>
                  <li className="mb-3">
                    <h5><i className="bi bi-telephone-fill me-2"></i> Phone</h5>
                    <p>(123) 456-7890</p>
                  </li>
                  <li className="mb-3">
                    <h5><i className="bi bi-envelope-fill me-2"></i> Email</h5>
                    <p>info@bookrec.com</p>
                  </li>
                  <li className="mb-3">
                    <h5><i className="bi bi-clock-fill me-2"></i> Hours</h5>
                    <p>Monday - Friday: 9am - 6pm</p>
                    <p>Saturday: 10am - 4pm</p>
                    <p>Sunday: Closed</p>
                  </li>
                </ul>
                
                <div className="mt-4">
                  <h5>Follow Us</h5>
                  <div className="social-links">
                    <a href="#" className="me-3 text-decoration-none">
                      <i className="bi bi-facebook fs-4"></i>
                    </a>
                    <a href="#" className="me-3 text-decoration-none">
                      <i className="bi bi-twitter fs-4"></i>
                    </a>
                    <a href="#" className="me-3 text-decoration-none">
                      <i className="bi bi-instagram fs-4"></i>
                    </a>
                    <a href="#" className="text-decoration-none">
                      <i className="bi bi-linkedin fs-4"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;