import {configureStore} from '@reduxjs/toolkit';

import authReducer from './slices/AuthSlice';
import userReducer from './slices/userSlice';
import photoReducer from './slices/PhotoSlice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        user: userReducer,
        photo: photoReducer,
    },
});