import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Form, 
  Button, 
  Card, 
  Row, 
  Col, 
  Spinner, 
  Alert, 
  Container,
  Badge,
  InputGroup,
  Placeholder
} from 'react-bootstrap';
import { Search, Book, StarFill, StarHalf } from 'react-bootstrap-icons';

const Recommend = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentBookSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const fetchRecommendations = async (e) => {
    e.preventDefault();
    if (!bookTitle.trim()) {
      setError('Please enter a book title');
      return;
    }

    setLoading(true);
    setError('');
    setRecommendations([]);

    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/recommend_books?title=${encodeURIComponent(bookTitle)}`
      );

      if (response.data.status === 'success') {
        setRecommendations(response.data.recommendations);
        
        // Update recent searches
        const updatedSearches = [
          bookTitle,
          ...recentSearches.filter(search => search !== bookTitle)
        ].slice(0, 5);
        
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentBookSearches', JSON.stringify(updatedSearches));
      } else {
        setError(response.data.message || 'No recommendations found for this book.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 
               'Failed to fetch recommendations. Please try again later.');
      console.error('Recommendation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRecentSearchClick = (searchTerm) => {
    setBookTitle(searchTerm);
    setShowRecentSearches(false);
  };

  const renderRatingStars = (score) => {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="d-flex align-items-center">
        {[...Array(fullStars)].map((_, i) => (
          <StarFill key={`full-${i}`} className="text-warning me-1" />
        ))}
        {hasHalfStar && <StarHalf className="text-warning me-1" />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarFill key={`empty-${i}`} className="text-secondary me-1" />
        ))}
        <small className="ms-1 text-muted">({score.toFixed(1)})</small>
      </div>
    );
  };

  return (
    <Container className="py-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-5"
      >
        <h1 className="display-5 fw-bold">
          <Book className="me-2" />
          Book Recommender
        </h1>
        <p className="lead text-muted">
          Discover your next favorite book based on your preferences
        </p>
      </motion.div>

      <Form onSubmit={fetchRecommendations} className="mb-5">
        <Form.Group controlId="bookTitle" className="position-relative">
          <InputGroup>
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <Form.Control
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              onFocus={() => setShowRecentSearches(true)}
              placeholder="e.g., The Da Vinci Code"
              required
            />
            <Button 
              variant="primary" 
              type="submit" 
              disabled={loading || !bookTitle.trim()}
            >
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Searching...
                </>
              ) : (
                'Find Recommendations'
              )}
            </Button>
          </InputGroup>

          {showRecentSearches && recentSearches.length > 0 && (
            <div className="position-absolute w-100 bg-white shadow-sm rounded-bottom border">
              <div className="p-2">
                <small className="text-muted">Recent searches:</small>
                {recentSearches.map((search, idx) => (
                  <div 
                    key={idx}
                    className="p-2 hover-bg cursor-pointer"
                    onClick={() => handleRecentSearchClick(search)}
                  >
                    {search}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Form.Group>
      </Form>

      {error && (
        <Alert 
          variant="danger" 
          dismissible 
          onClose={() => setError('')}
          className="mb-4"
        >
          {error}
        </Alert>
      )}

      {loading && !recommendations.length && (
        <Row className="g-4">
          {[...Array(4)].map((_, idx) => (
            <Col xs={12} sm={6} md={4} lg={3} key={idx}>
              <Card className="h-100">
                <Placeholder as={Card.Img} animation="wave" />
                <Card.Body>
                  <Placeholder as={Card.Title} animation="wave">
                    <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="wave">
                    <Placeholder xs={7} /> <Placeholder xs={4} />
                  </Placeholder>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {recommendations.length > 0 && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>
              Recommendations for "{bookTitle}"
              <Badge bg="secondary" className="ms-2">
                {recommendations.length} books
              </Badge>
            </h4>
            <small className="text-muted">
              Sorted by relevance
            </small>
          </div>

          <Row className="g-4">
            {recommendations.map((book, idx) => (
              <Col xs={12} sm={6} md={4} lg={3} key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card className="h-100 shadow-sm border-0">
                    <div className="ratio ratio-4x3">
                      <Card.Img
                        variant="top"
                        src={book.image_url || 'https://via.placeholder.com/300x400?text=No+Image'}
                        alt={book.title}
                        className="object-fit-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                        }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title className="text-truncate" title={book.title}>
                        {book.title}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted text-truncate">
                        {book.author}
                      </Card.Subtitle>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        {renderRatingStars(book.similarity_score * 5)}
                        <Badge bg="light" text="dark">
                          {book.year_of_publication || 'N/A'}
                        </Badge>
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-white border-0">
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="w-100"
                        onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(book.title + ' ' + book.author)}`, '_blank')}
                      >
                        View Details
                      </Button>
                    </Card.Footer>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </>
      )}

      {!loading && !recommendations.length && !error && (
        <div className="text-center py-5">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" 
            alt="Search books" 
            style={{ width: '120px', opacity: 0.5 }} 
            className="mb-3"
          />
          <h5 className="text-muted">Search for book recommendations</h5>
          <p className="text-muted">
            Enter a book title you enjoy to get personalized recommendations
          </p>
        </div>
      )}
    </Container>
  );
};

export default Recommend;