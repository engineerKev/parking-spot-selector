import { createSlice } from '@reduxjs/toolkit';
const MAX_SPOTS_PER_ROW = 4;
const PARKING_BUILDINGS = ['a', 'b', 'c'];

const generateParkingSpots = () => {
  const parkingSpotsObj = PARKING_BUILDINGS.reduce((initStateObj, currKey) => {
    initStateObj[currKey] = [];
    for(let i = 0; i < MAX_SPOTS_PER_ROW; i++) {
      const randomParkingSpotState = Math.floor(Math.random()*2);
      initStateObj[currKey][i] = randomParkingSpotState;
    }
    return initStateObj;
  }, {});
  return parkingSpotsObj;
}

const returnAvailableSpots = (parkingSpotsCopy) => {
  const atCapacityParkingStructures = Object.keys(parkingSpotsCopy)
    .filter(parkingStructureKey => parkingSpotsCopy[parkingStructureKey].indexOf(0) === -1);

  atCapacityParkingStructures.forEach(parkingStrucutreKey => {
    delete parkingSpotsCopy[parkingStrucutreKey]
  });

  return parkingSpotsCopy;
}

const randomlyGeneratedParkingSpots = generateParkingSpots();
console.log('randomly generated parking spots obj: ', randomlyGeneratedParkingSpots)
const randomInitialParkingSpotsState = returnAvailableSpots(randomlyGeneratedParkingSpots);
const initialState = {
  parkingSpots: randomInitialParkingSpotsState,
  noAvailableSpots: false
};

console.log('initialState: ', initialState)

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
    },
    resetParkingStructure: (state) => {
      Object.assign(state, initialState)
    }
  }
});


export const { updateParkingStructure, resetParkingStructure } = parkingSpotsSlice.actions;

export default parkingSpotsSlice.reducer;