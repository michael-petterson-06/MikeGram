import React from 'react';
import { uploads } from "../../utils/config";
// Componentes
import LikeContainer from '../../components/likeContainer/LikeContainer';
// import Message from "../../components/Message";
// import PhotoItem from "../../components/photoItem/PhotoItem";
import { Link } from "react-router-dom";
// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getPhoto, like } from "../../slices/PhotoSlice";
import PhotoItem from '../../components/photoItem/PhotoItem';



const Photo = () => {;
  const { id } = useParams();

  const dispatch = useDispatch();
  

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );
    
  //Carregar dados da foto
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

   // Like na Foto
   const handleLike = () => {
    dispatch(like(photo._id));

 
  };
    
  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
    </div>
  )
}

export default Photo;
