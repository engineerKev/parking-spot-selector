import { createSlice } from '@reduxjs/toolkit';
const MAX_SPOTS_PER_ROW = 4;
const generateParkingSpots = () => {
  //TODO: USE MATH.RANDOM TO PICK 0 OR 1 FOR EACH PARKING STRUCTURE
}

const returnAvailableSpots = (parkingSpotsCopy) => {
  const atCapacityParkingStructures = Object.keys(parkingSpotsCopy)
    .filter(parkingStructureKey => parkingSpotsCopy[parkingStructureKey].indexOf(0) === -1);

  atCapacityParkingStructures.forEach(parkingStrucutreKey => {
    delete parkingSpotsCopy[parkingStrucutreKey]
  });

  return parkingSpotsCopy;
}

const initialState = {
  parkingSpots: {
    a: [0, 1, 1, 1],
    b: [1, 1, 1, 0],
    c: [0, 1, 1, 1]
  },
  noAvailableSpots: false
};

const parkingSpotsSlice = createSlice({
  name: 'parking structure',
  initialState,
  reducers: {
    updateParkingStructure: (state, action) => {
      const {parkingBuilding, parkingSpotIndx} = action.payload;
      state.parkingSpots[parkingBuilding][parkingSpotIndx] = 1;
      const newParkingSpotsObj = returnAvailableSpots({...state.parkingSpots });

      Object.assign(state, {
        parkingSpots: newParkingSpotsObj,
        noAvailableSpots: !Boolean(Object.keys(newParkingSpotsObj).length)
      })
    }
  }
});


export const { updateParkingStructure } = parkingSpotsSlice.actions;

export default parkingSpotsSlice.reducer;