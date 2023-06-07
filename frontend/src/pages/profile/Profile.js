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


const Profile = () => {
    return (
        <div>Profile</div>
    )
}

export default Profile;