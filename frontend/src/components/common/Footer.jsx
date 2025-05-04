import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  FaFacebook, FaTwitter, FaLinkedin, FaInstagram, 
  FaYoutube, FaTiktok, FaApple, FaGooglePlay
} from 'react-icons/fa';

function Footer() {
  // Footer sections data
  const sections = [
    {
      title: "Technical Skills",
      links: [
        { name: "ChatGPT", url: "https://www.coursera.org/courses?query=chatgpt" },
        { name: "Coding", url: "https://www.coursera.org/courses?query=coding" },
        { name: "Computer Science", url: "https://www.coursera.org/courses?query=computer%20science" },
        { name: "Cybersecurity", url: "https://www.coursera.org/courses?query=cybersecurity" },
        { name: "DevOps", url: "https://www.coursera.org/courses?query=devops" }
      ]
    },
    {
      title: "Business Skills",
      links: [
        { name: "Accounting", url: "https://www.coursera.org/courses?query=accounting" },
        { name: "Digital Marketing", url: "https://www.coursera.org/courses?query=digital%20marketing" },
        { name: "Finance", url: "https://www.coursera.org/courses?query=finance" },
        { name: "Project Management", url: "https://www.coursera.org/courses?query=project%20management" }
      ]
    },
    {
      title: "Coursera",
      links: [
        { name: "About", url: "https://about.coursera.org/" },
        { name: "What We Offer", url: "https://about.coursera.org/how-coursera-works/" },
        { name: "Leadership", url: "https://about.coursera.org/leadership" },
        { name: "Careers", url: "https://careers.coursera.com/" }
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Learners", url: "https://www.coursera.community" },
        { name: "Partners", url: "https://www.coursera.org/partners" },
        { name: "Blog", url: "https://blog.coursera.org" },
        { name: "Tech Blog", url: "https://medium.com/coursera-engineering" }
      ]
    }
  ];

  // Social media links
  const socialLinks = [
    { icon: <FaFacebook size={20} />, url: "https://www.facebook.com/Coursera" },
    { icon: <FaLinkedin size={20} />, url: "https://www.linkedin.com/company/coursera" },
    { icon: <FaTwitter size={20} />, url: "https://twitter.com/coursera" },
    { icon: <FaYoutube size={20} />, url: "https://www.youtube.com/user/coursera" },
    { icon: <FaInstagram size={20} />, url: "https://www.instagram.com/coursera/" },
    { icon: <FaTiktok size={20} />, url: "https://www.tiktok.com/@coursera" }
  ];

  return (
    <footer className="bg-light text-dark pt-5 pb-3 mt-5">
      <Container>
        {/* Main Footer Content */}
        <Row className="g-4">
          {sections.map((section, index) => (
            <Col key={index} md={6} lg={3}>
              <h5 className="fw-bold mb-3">{section.title}</h5>
              <ul className="list-unstyled">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="mb-2">
                    <a 
                      href={link.url} 
                      className="text-decoration-none text-dark"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
          
          {/* Mobile Apps Section */}
          <Col md={6} lg={3}>
            <h5 className="fw-bold mb-3">Learn Anywhere</h5>
            <div className="d-flex flex-column gap-2">
              <a 
                href="https://apps.apple.com/us/app/coursera/id736535961" 
                className="btn btn-outline-dark d-flex align-items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaApple /> App Store
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=org.coursera.android" 
                className="btn btn-outline-dark d-flex align-items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGooglePlay /> Google Play
              </a>
            </div>
            
            {/* B Corp Logo - Replace with your actual image */}
            <div className="mt-3">
              <img 
                src="/path-to-your-bcorp-logo.png" 
                alt="B Corporation Certified" 
                style={{ height: '60px' }}
              />
            </div>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        {/* Social Media and Copyright */}
        <Row className="align-items-center">
          <Col md={6} className="mb-3 mb-md-0">
            <p className="mb-0">© 2025 Coursera Inc. All rights reserved.</p>
          </Col>
          <Col md={6}>
            <div className="d-flex justify-content-md-end gap-3">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  className="text-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;