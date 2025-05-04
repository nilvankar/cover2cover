import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Header as="h2">About Us</Card.Header>
            <Card.Body>
              <Card.Title>AI-Driven Student Performance Analysis System</Card.Title>
              <Card.Text>
                Our system integrates PAT (Periodic Assessment Test), SAT (Scholastic Assessment Test), 
                and Attendance data to provide predictive analysis of students' performance. 
                This helps educators, parents, and administrators make data-driven decisions 
                to improve educational outcomes.
              </Card.Text>
              <Card.Text>
                The system provides role-based access to different stakeholders including 
                students, parents, school authorities, and various levels of administration.
              </Card.Text>
              <Card.Text>
                Our mission is to leverage AI and data analytics to transform education 
                by identifying at-risk students early and providing actionable insights 
                to all stakeholders in the education ecosystem.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AboutUs;