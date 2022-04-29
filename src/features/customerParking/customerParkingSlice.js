import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  parkingBuilding: '',
  parkingSpot: ''
}

const customerParkingSlice = createSlice({
  name: 'customer parking state',
  initialState,
  reducers: {
    updateCustomerParking: (state, action) => {
      const {parkingBuilding, parkingSpot} = action.payload;
      Object.assign(state, { parkingBuilding, parkingSpot});
    }
  }
});

export const { updateCustomerParking } = customerParkingSlice.actions;
export default customerParkingSlice.reducer;