import { api, requestConfig } from '../utils/config';

// Registra usuário no sistema
const register = async (data) => {
    
    const config = requestConfig('POST', data);
    
    try {
        const res = await fetch(api + '/users/register', config)
        
            .then((res) => res.json())
            .catch((err) => err);
            console.log(res)    
        if(res) {
            localStorage.setItem('user', JSON.stringify(res));
        }
        
        return res;                   
    } catch (error) {
        console.log('estouu no catch')
        console.log(error);
    }
}

const authService = {
    register,
    
  };
  
  export default authService;