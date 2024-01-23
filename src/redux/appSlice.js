import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    roomId: null,
  },
  reducers: {
    enterRoom: (state,action) => {
      state.roomId = action.payload.roomId;
    },
   
  },
});

// Action creators are generated for each case reducer function
export const { enterRoom } = appSlice.actions;

export const selectApp = state => state.app.roomId

export default appSlice.reducer;
