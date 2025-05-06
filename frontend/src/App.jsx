import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import About from './pages/About';
import Recommend from './pages/Recommend';
import { Container } from 'react-bootstrap';
function App() {
  return (
    <Router>
        <div>
          <Header />
          <Container fluid className="px-4" style={{ minHeight: '90vh' }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/recommend" element={<Recommend />} />
              

             
            </Routes>
          </Container>
          
        </div>
    </Router>
  );
}

export default App;