import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Pages/Landing';
import Bucket from './Pages/Bucket';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/bucket' element={<Bucket/>}/>
      </Routes>
    </Router>
  );
}

export default App;

