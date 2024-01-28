import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    roomId: null,
    loggedInUser:{}
  },
  reducers: {
    enterRoom: (state,action) => {
      state.roomId = action.payload.roomId;
    },
   loggedInUser: (state,action)=>{
    state.loggedInUser = action.payload
   }
  },
});

// Action creators are generated for each case reducer function
export const { enterRoom,loggedInUser } = appSlice.actions;

export const selectRoomId = state => state.app.roomId
export const selectLoggedInUser = state => state.app.roomId


export default appSlice.reducer;
