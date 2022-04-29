import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCustomerParking } from '../features/customerParking/customerParkingSlice';

function ParkingInstructions() {
  const { parkingBuilding, parkingSpot } = useSelector((store) =>  store.customerParking);
  const dispatch = useDispatch();
  
  const newCustomerHasArrived = () => {
    dispatch(updateCustomerParking({
      parkingBuilding: '',
      parkingSpot: ''
    }));
  }

  return (
    <div>
      <h3>Please proceed to parking spot {parkingSpot} in building {parkingBuilding.toUpperCase()}</h3>
      <button onClick={newCustomerHasArrived}>next costumer</button>
    </div>
  )
}
export default ParkingInstructions;