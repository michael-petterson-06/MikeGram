import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

//Hooks
import { useAuth } from './hooks/userAuth';

//Paginas
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Profile from './pages/profile/Profile';

//Componentes
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';
import Photo from "./pages/photo/Photo";
import Search from './pages/search/Search';

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
            <Route path='/profile'  element={auth ? <EditProfile/> : <Navigate to='/login'/>}/>
            <Route path='/users/:id' element={auth ? <Profile/> : <Navigate to='/login'/>}/>
            <Route path="/search" element={auth ? <Search /> : <Navigate to="/login" />}/>
            <Route path='/login' element={!auth ? <Login/> : <Navigate to='/'/>} />
            <Route path='/register' element={!auth ? <Register/> : <Navigate to='/'/>}/>
            <Route path="/photos/:id" element={auth ? <Photo /> : <Navigate to='/login'/>} />
          </Routes>
          
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
