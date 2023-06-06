import './Auth.css';

//Componentes
import { Link } from 'react-router-dom';
import Message from '../../components/message/Message';
//
//Hooks
import { useEffect, useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
//Redux
import { login, reset }  from '../../slices/AuthSlice';


 
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
        }
        console.log(user)
        dispatch(login(user));
    }

    useEffect(() => {
        dispatch(reset())
    }, [dispatch]);
    
    return (
        <div id='login'>
            <h2>MikeGram</h2>
            <p className="subtitle">Faça o login para ver oque há de novo.</p>
            <form onSubmit={handleSubmit}>
                        
                <input
                    type="text"
                    placeholder='E-mail'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email || ''}
                />
                <input
                    type="password"
                    placeholder='senha'
                    onChange={(e) => setPassWord(e.target.value)}
                    value={password || ''}
                />
                {!loading && <input type="submit" value="Entrar" />}
                {loading && <input type="submit" disabled value="Aguarde..." />}
                {error && <Message msg={error} type="error" />}
            </form>
            <p>
                Não tem conta? <Link to='/register'> Clique aqui</Link>
            </p>
        </div>
    )
}

export default Login;

