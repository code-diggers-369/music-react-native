import {createSlice} from '@reduxjs/toolkit';

const songSlice = createSlice({
  name: 'song',
  initialState: {
    isSongIsPause: true,
    currentSong: {
      name: '',
      duration: '',
      image: '',
    },
  },
  reducers: {
    setIsSongIsPause(state, action) {
      state.isSongIsPause = action.payload.isSongIsPause;
    },
    setCurrentSong(state, action) {
      state.currentSong = action.payload.currentSong;
    },
  },
});

export const {setCurrentSong, setIsSongIsPause} = songSlice.actions;

export default songSlice.reducer;
