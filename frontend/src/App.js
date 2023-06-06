import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

//Hooks
import { useAuth } from './hooks/userAuth';

//Paginas
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';

//Componentes
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';
import { Profiler } from 'react';
import EditProfile from './pages/editProfile/EditeProfile';



function App() {

  const { auth, loading } = useAuth();

  if(loading) {
    return <p>Carregando...</p>
  }
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <div className="container">
          <Routes>
            <Route path='/' element={auth ? <Home/> : <Navigate to='/login'/>}/>
            <Route path='/profile' element={auth ? <EditProfile/> : <Navigate to='/login'/>}/>
            <Route path='/login' element={!auth ? <Login/> : <Navigate to='/'/>} />
            <Route path='/register' element={!auth ? <Register/> : <Navigate to='/'/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
