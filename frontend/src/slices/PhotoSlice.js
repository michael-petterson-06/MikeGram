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
export const getUserPhotos = createAsyncThunk(
    'photo/userPhotos',
    async(id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await photoService.getUserPhotos(id, token);
        return data;
    }
)

//Deletar foto
export const deletePhoto = createAsyncThunk(
    'photo/delete',
    async(id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await photoService.deletePhoto(id, token);
        if(data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
          }
        return data;
    }
)
//Atualizar uma foto
export const updatePhoto = createAsyncThunk(
    'photo/update',
    async(photoData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await photoService.updatePhoto({title: photoData.title}, photoData.id, token);
        if(data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
          }
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
        .addCase(getUserPhotos.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getUserPhotos.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
          })
          .addCase(updatePhoto.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updatePhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos.map((photo) => {
                if(photo._id === action.payload.id) {
                    return photo.title =action.payload.photo.title;
                }
                return photo;
            });
            state.message = action.payload.message;
          })
          .addCase(updatePhoto.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
              state.photo = {};
          })
          
    }
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;

