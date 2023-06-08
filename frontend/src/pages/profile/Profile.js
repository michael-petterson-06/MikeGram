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
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto } from '../../slices/PhotoSlice';

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

    const {
        photos,
        loading: loadingPhoto,
        error: errorPhoto,
        message: messagePhoto,
      } = useSelector((state) => state.photo);
    
      

    //Carregar usuário
    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id))
    },[dispatch, id]);

    

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');

    const handleFile = (e) => {
       
        const image = e.target.files[0];
        setImage(image);
       
    }

    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }
    const submitHandle = (e) => {
        e.preventDefault();
        const photoData = {
            title,
            image,
        }
        const formData = new FormData();
        const photoFormData = Object.keys(photoData).forEach((key) => 
            formData.append(key, photoData[key])
        );
        formData.append('photo', photoFormData);
        dispatch(publishPhoto(formData));
        setTitle('');
        resetComponentMessage();
    }

    const handleDelete = (id) => {
        dispatch(deletePhoto(id));
        resetComponentMessage();
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
                                <input
                                     type="text"
                                     placeholder='Insira um título'
                                     onChange={(e) => setTitle(e.target.value)}
                                     value={title || ''}
                                />
                            </label>
                            <label>
                                <span>Imagem:</span>
                                <input type="file" onChange={handleFile}/>
                            </label>
                            {!loadingPhoto && <input type="submit" value='Postar'/>}
                            {loadingPhoto && <input type="submit" disable value='Aguarde...'/>}
                        </form>
                    </div>
                    {errorPhoto && <Message msg={errorPhoto} type='error'/>}
                    {messagePhoto && <Message msg={messagePhoto} type='success'/>}
                </>
            )}
            <div className="user-photos">
                <h2>Fotos publicadas:</h2>
                <div className="photos-container">
                    {photos.map((photo) => (
                        <div className="photo" key={photo._id}>
                            {photo.image &&
                               (<img
                                   src={`${uploads}/photos/${photo.image}`}
                                    alt={photo.title}
                               />)}
                         {id === userAuth._id ? (
                            <div className="actions">
                                <Link to={`/photos/${photo._id}`}>
                                    <BsFillEyeFill/>
                                </Link>
                                <BsPencilFill/>
                                <BsXLg onClick={() => handleDelete(photo._id)}/>
                            </div>
                         ) :
                         (<Link className='btn' to={`/photos/${photo._id}`}>Ver</Link>)}      
                        </div>
                    ))}
                    {photos.length === 0 && <p>Ainda não há fotos publicada</p>}
                </div>
            </div>
        </div>
    )
}

export default Profile;