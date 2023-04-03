import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        infos: {
            id: null,
            email: null,
            lastName: null,
            firstName: null,
            avatarName: null,
            isAdmin: false,
        },
        isLogged: false,
    },
    reducers: {
        signIn(state, action) {
            state.infos = action.payload;
            state.isLogged = true;
        },
        signOut(state, action){
            state.infos = null;
            state.isLogged = false;
        }
    }
});

export const {signIn, signOut} = userSlice.actions;
export default userSlice.reducer;