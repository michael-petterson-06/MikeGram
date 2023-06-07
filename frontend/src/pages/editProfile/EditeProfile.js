import './EditProfile.css';
import { uploads } from '../../utils/config';
//Hooks
import {useEffect, useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';

//Redux
import {profile, resetMessage } from '../../slices/userSlice';

//Componentes
import Message from '../../components/message/Message';


const EditProfile = () => {

    const dispatch = useDispatch();
    const {user, message, error, loading } = useSelector((state) => state.user);

    const [name, setName ] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState();
    const [profileImage, setProfileImage ] = useState('');
    const [bio, setBio ] = useState('');
    const [previewImage, setPreviewImage ] = useState('');


    useEffect(() => {
        dispatch(profile());
    },[dispatch]);

    //Preencher campos com dados do usuário
    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            setPassword(user.password);
        }
    },[user]);

    
    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleFile = (e) => {
        //Imagem do preview
        const image = e.target.files[0];
        setPreviewImage(image);

        //Atualizar state da image
        setProfileImage(image);
    }
    return (
        <div id='edit-profile'>
            <h2>Edite seus dados</h2>
            <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre voce...</p>
            {(user.profileImage || previewImage) && (
            <img
            className="profile-image"
            src={
                previewImage
                ? URL.createObjectURL(previewImage)
                : `${uploads}/users/${user.profileImage}`
            }
            alt={user.name}
        />
      )}
            <form onSubmit={handleSubmit}>
                <input type="text"
                        placeholder='Nome'
                        onChange={(e) => setName(e.target.value)}
                        value={name || ''}
                />
                <input type="email" placeholder='E-mail' disabled value={email || ''} />
                <label>
                    <span>Imagem de Perfil:</span>
                    <input type="file" onChange={handleFile}/>
                </label>
                <label>
                    <span>Bio:</span>
                    <input type="text"
                           placeholder='Descrição do perfil'
                           onChange={(e) => setBio(e.target.value)} value={bio || ''} />
                </label>
                <label>
                    <span>Quer alterar sua senha?</span>
                    <input type="password"
                    palceholder='Digite sua nova senha'
                    onChange={(e) => setPassword(e.target.value)} value={password || ''}/>
                </label>
                <input type="submit" value='Atualizar' />
            </form>
        </div>
    )
}
export default EditProfile;