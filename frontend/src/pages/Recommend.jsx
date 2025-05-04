import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {Form, Button, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';

const Recommend = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecommendations([]);

    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/recommend_books?title=${encodeURIComponent(bookTitle)}`
      );

      if (response.data.status === 'success') {
        setRecommendations(response.data.recommendations);
      } else {
        setError(response.data.message || 'Something went wrong.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
     <>
      <motion.h2 className="text-center mb-4" whileHover={{ scale: 1.05 }}>
        Book Recommender
      </motion.h2>

      <Form onSubmit={fetchRecommendations} className="mb-4">
        <Form.Group controlId="bookTitle">
          <Form.Label>Enter a book title</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            placeholder="e.g., The Notebook"
            required
          />
        </Form.Group>
        <div className="mt-3 text-center">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Fetching...
              </>
            ) : (
              'Get Recommendations'
            )}
          </Button>
        </div>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {recommendations.map((book, idx) => (
          <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={idx}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={book.image_url}
                  alt={book.title}
                  style={{ height: '250px', objectFit: 'contain' }}
                />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>
                    <strong>Author:</strong> {book.author}
                    <br />
                    <small>Similarity Score: {book.similarity_score.toFixed(2)}</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Recommend;
