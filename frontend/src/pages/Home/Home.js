import'./Home.css';
// Componentes
import LikeContainer from "../../components/likeContainer/LikeContainer";
import PhotoItem from "../../components/photoItem/PhotoItem";
import { Link } from "react-router-dom";
// Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/UseResetComponentMessage";
//Redux
import { getPhotos, like } from "../../slices/PhotoSlice";

const Home = () => {
    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);
  
    const { user } = useSelector((state) => state.auth);
    const { photos, loading } = useSelector((state) => state.photo);

      // Carregando as fotos
    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    const handleLike = (photo = null) => {
        dispatch(like(photo._id));
    
        resetMessage();
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    
    return (
        <div>
            Home
        </div>
    )
}


export default Home;