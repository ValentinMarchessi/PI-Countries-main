import { Routes, Route } from 'react-router-dom';
import './App.css';

//components
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
