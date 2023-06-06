import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: false,
}

//funções

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducer: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;