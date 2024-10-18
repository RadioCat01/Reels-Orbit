import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Pages/Landing';
import Bucket from './Pages/Bucket';
import Search from './Pages/Search';
import Admin  from './Pages/Admin';
import PaymentSuccess from './Pages/Movie -info/Payment-Continue/PaymentSuccess';
import PaymentCanceled from './Pages/Movie -info/Payment-Continue/PaymentCanceled';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import ProtectedRoute from './Pages/AdminLogin/ProtectedRoutes';
import { useState } from 'react';
import MovieExtended from './Pages/MovieExtended/MovieExtended';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/bucket' element={<Bucket/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/paymentSuccess/:movieId' element={<PaymentSuccess/>}/>
        <Route path='/paymentCanceled' element={<PaymentCanceled/>}/>
        <Route path="/movie/:id" element={<MovieExtended />} />
        <Route path='/login' element={<AdminLogin onLogin={setIsAuthenticated} />}/>
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Admin />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;

