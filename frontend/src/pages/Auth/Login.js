import './Auth.css';

//Componentes
import { Link } from 'react-router-dom';
import Message from '../../components/message/Message';
//
//Hooks
import { useEffect, useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
//Redux

 
const Login = () => {

    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    return (
        <div id='login'>
            <h2>MikeGram</h2>
            <p className="subtitle">Faça o login para ver oque há de novo.</p>
            <form submit={handleSubmit}>
                <input
                    type="text"
                    placeholder='E-mail'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email || ''}
                />
                <input
                    type="passwortd"
                    placeholder='senha'
                    onChange={(e) => setPassWord(e.target.value)}
                    value={passWord || ''}
                />
                <input type="submit" value='Entrar'/>
            </form>
            <p>
                Não tem conta? <Link to='/register'> Clique aqui</Link>
            </p>
        </div>
    )
}

export default Login;

