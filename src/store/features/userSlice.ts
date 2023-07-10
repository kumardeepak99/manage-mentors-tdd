import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  name: string;
  email: string;
}

export const initialUserState: UserState = {
  id: "",
  name: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    createUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    deleteUser: (state) => {
      state.id = initialUserState.id;
      state.name = initialUserState.name;
      state.email = initialUserState.email;
    },
  },
});

export const { createUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
