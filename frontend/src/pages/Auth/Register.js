import './Auth.css';

//Hooks
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

const handleSubmit = (e) => {
    e.preventDefault();
}

const Register = () => {
    return (
        <div id='register'>
            <h2>MikeGram</h2>
            <p className="subtitle">Cadastra-se para ver as fotos dos seus amigos</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Nome'/>
                <input type="email" placeholder='E-mail'/>
                <input type="password" placeholder='Senha'/>
                <input type="password" placeholder='Confirme a senha'/>
                <input type="submit" value='Cadastrar'/>
            </form>
            <p>
                Já tem conta? <Link to='/login'>Clique aqui.</Link>
            </p>
        </div>
    )
}

export default Register;