import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

//Paginas
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';

//Componentes
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
