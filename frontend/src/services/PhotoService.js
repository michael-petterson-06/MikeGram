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

//Deletar foto
const deletePhoto = async(id, token) => {
    const config = requestConfig('DELETE', null, token);

    try {
        const res = await fetch(api + '/photos/' + id, config)
                        .then((res) => res.json())
                        .catch((err) => err)
        return res;                        
    } catch (error) {
        console.log(error);
    };
};

//Atualizar a foto
const updatePhoto = async(data, id, token) => {
    const config = requestConfig("PUT", data, token);
    try {
        const res = await fetch(api + '/photos/' + id, config)
                            .then((res)=> res.json())
                            .catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    };
};

//Foto pelo id
const getPhoto = async(id, token) => {
    const config = requestConfig("GET", null, token);
   
    try {
        const res = await fetch(api + '/photos/' + id, config)
                        .then((res)=> res.json())
                        .catch((err) => err);
       return res;                    
    } catch (error) {
        console.log(error);
    };
};

// Like na Foto
const like = async (id, token) => {
    const config = requestConfig("PUT", null, token);
  
    try {
      const res = await fetch(api + "/photos/like/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);
        
      return res;
    } catch (error) {
      console.log(error);
    }
};

// Adicionar um comentário na Foto
const comment = async (data, id, token) => {
    const config = requestConfig("PUT", data, token);
  
    try {
      const res = await fetch(api + "/photos/comment/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);
  
      return res;
    } catch (error) {
      console.log(error);
    }
};

// Pegar todas as fotos
const getPhotos = async (token) => {
    const config = requestConfig("GET", null, token);
  
    try {
      const res = await fetch(api + "/photos", config)
        .then((res) => res.json())
        .catch((err) => err);
  
      return res;
    } catch (error) {
      console.log(error);
    }
  };

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    like,
    comment,
    getPhotos
};

export default photoService;
