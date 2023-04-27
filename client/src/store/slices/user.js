import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        infos: {
            id: null,
            email: null,
            lastName: null,
            firstName: null,
            birthDate: null,
            avatarName: null,
            phone: null,
            handicap: null,
            isAdmin: false,
        },
        isLogged: false,
    },
    reducers: {
        signIn(state, action) {
            state.infos = action.payload;
            state.isLogged = true;
        },
        signOut(state, action) {
            state.infos = null;
            state.isLogged = false;
        },
        updateUser(state, action) {
            state.infos = action.payload;
        },
    }
});

export const { signIn, signOut, updateUser } = userSlice.actions;
export default userSlice.reducer;