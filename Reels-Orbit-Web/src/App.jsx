import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Pages/Landing';
import Bucket from './Pages/Bucket';
import Search from './Pages/Search';
import Admin from './Pages/admin';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/bucket' element={<Bucket/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </Router>
  );
}

export default App;

