import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/PhotoService";

const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};

//Publicando uma foto
export const publishPhoto = createAsyncThunk(
    'photo/publish',
    async(photo, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data  = await photoService.publishPhoto(photo, token);
        if(data.errors) {
          return thunkAPI.rejectWithValue(data.errors[0]);
        }
        return data;
    }
)

//Resgatando fotos de um usuário
export const getUserPhootos = createAsyncThunk(
    'photo/userPhotos',
    async(id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await photoService.getUserPhotos(id, token);
        return data;
    }
)


export const photoSlice = createSlice({

    name: 'photo',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        },
    },
    extraReducers:(builder) => {
        builder
        .addCase(publishPhoto.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(publishPhoto.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.photo = action.payload;
          state.photos.unshift(state.photo);
          state.message = 'Foto publicada com sucesso!';
        })
        .addCase(publishPhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.photo = {};
        })
        .addCase(getUserPhootos.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getUserPhootos.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
          })
    }
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;

