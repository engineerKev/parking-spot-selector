import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false
}

const loadingStateSlice = createSlice({
  name: 'loading state',
  initialState,
  reducers: {
    updateIsLoading: (state, action) => {
      const loadingState = action.payload;
      state.isLoading = loadingState;
    }
  }
});

export const { updateIsLoading } = loadingStateSlice.actions;
export default loadingStateSlice.reducer;