import './App.css'
import { BrowserRouter as Route, Router, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Landing from './Pages/Landing';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </Router>
  )
}

export default App
