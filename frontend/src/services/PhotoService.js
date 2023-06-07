import { api, requestConfig } from '../utils/config';


//Publicando uma foto
const publishPhoto = async(data, token) => {
    const config = requestConfig('POST', data, token, true);
    try {
        const res = await fetch(api + '/photos', config)
                        .then((res) => res.json())
                        .catch((error) => error)
       return res;                            
    } catch(error){
        console.log(error);
    }
}

//Resgatando fotos de um usuário específico.
const getUserPhotos = async(id, token) => {
    const config = requestConfig('GET',null, token);
    try {
        const res = await fetch(api + '/photos/user/'+id, config)
                            .then((res) => res.json())
                            .catch((error) => error)
        return res;                               
    } catch(err) {
        console.log(err);
    }
}


const photoService = {
    publishPhoto,
    getUserPhotos,
};

export default photoService;
