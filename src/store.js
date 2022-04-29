import { configureStore } from '@reduxjs/toolkit';
import parkingSpotsReducer from './features/parkingSlots/parkingSpotsSlice';
import isLoadingReducer from './features/loading/loadingSlice';
import customerParkingReducer from './features/customerParking/customerParkingSlice';

export const store = configureStore({
  reducer: {
    parkingStructure: parkingSpotsReducer,
    loadingState: isLoadingReducer,
    customerParking: customerParkingReducer
  }
});