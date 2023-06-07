import React from 'react';
import './Profile.css';
import { uploads } from '../../utils/config';

//Componentes
import Message from '../../components/message/Message';


import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

//Hooks
import { useState, useEffect, useRef } from 'react';
import{ useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

//Redux
import { getUserDetails } from '../../slices/userSlice';


const Profile = () => {

    const  { id } = useParams();
    const dispatch = useDispatch();
    
    //Perifl usuário pelo ID
    const { user, loading } = useSelector((state) => state.user);
    //Pegar usuário pela autênticação
    const {user: userAuth}  = useSelector((state) => state.auth) ;

    //Novo formulário e editar formulário de referência
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();



    //Carregar usuário
    useEffect(() => {
        dispatch(getUserDetails(id));
    },[dispatch, id]);

    const submitHandle = (e) => {
        e.preventDefault();
    }

    if(loading) {
        return <p>Carregando...</p>
    }

    return (
        <div id='profile'>
            <div className="profile-header">
                {user.profileImage && (
                    <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                )}
                <div className="profile-description">
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>
            {id === userAuth._id && (
                <>
                    <div className='new-photo' ref={newPhotoForm}>
                        <h3>Compartilhe algum momento seu:</h3>
                        <form onSubmit={submitHandle}>
                            <label>
                                <span>Título para foto:</span>
                                <input type="text" placeholder='Insira um título'/>
                            </label>
                            <label>
                                <span>Imagem:</span>
                                <input type="file"/>
                            </label>
                            <input type="submit" value='Postar'/>
                        </form>
                    </div>
                </>
            )}
        </div>
    )
}

export default Profile;