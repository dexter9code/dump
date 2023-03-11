import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: '',
};

export const AuthSlice = createSlice({
  name: `auth`,
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: state => {
      state.token = '';
    },
  },
});

export const {logout, signIn} = AuthSlice.actions;

export default AuthSlice.reducer;
