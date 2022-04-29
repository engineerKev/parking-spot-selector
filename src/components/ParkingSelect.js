import React, { useCallback, useRef, Fragment} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateParkingStructure } from '../features/parkingSlots/parkingSpotsSlice';
import { updateIsLoading } from '../features/loading/loadingSlice';
import { updateCustomerParking } from '../features/customerParking/customerParkingSlice';

function isSpotAvaibale(spot) {
  return spot === 0;
}

function selectClosestAvailableParkingSpot(building, buildingNumber, parkingSpots) {
  //returns index of closest available spot
  const parkingRowToSearch = parseInt(buildingNumber) < 2 ? parkingSpots[building] : [...parkingSpots[building]].reverse();
  const indexOfAvailableSpot = parkingRowToSearch.findIndex(isSpotAvaibale);
  const closestParkingSpot = parseInt(buildingNumber) < 2 ? indexOfAvailableSpot : (parkingRowToSearch.length - 1) - indexOfAvailableSpot;
  return closestParkingSpot;
}

function ParkingSelect({selectId, selectLabel, defaultOption}) {
  const parkingBuildingSelectRef = useRef(null);
  const isLoading = useSelector((store) => store.loadingState.isLoading)
  const { parkingSpots, noAvailableSpots } = useSelector((store) =>  store.parkingStructure);
  const dispatch = useDispatch();
  
  const availableParkingBuildings = useCallback(() => {
    return Object.keys(parkingSpots).map((parkingStructureKey) => {
      return (
        <Fragment key={`parking-structure-${parkingStructureKey}`}>
          <option name={`${parkingStructureKey}1`} key={`${parkingStructureKey}-1`}>{`${parkingStructureKey.toUpperCase()}1`}</option>
          <option name={`${parkingStructureKey}2`} key={`${parkingStructureKey}-2`}>{`${parkingStructureKey.toUpperCase()}2`}</option>
        </Fragment>
      );
    })
  }, [parkingSpots]);

  const onParkingStructureSelect = (e) => {
    // consider adding loading flag to the state
    dispatch(updateIsLoading(true));
    const customerSelection = e.target.value.toLowerCase();
    const [parkingBuilding, buildingNumber] = [...customerSelection];
    const parkingSpotIndx = selectClosestAvailableParkingSpot(parkingBuilding, buildingNumber, parkingSpots);
    dispatch(updateIsLoading(false));
    // dispatch action to update parking structure state
    dispatch(updateParkingStructure({parkingBuilding, parkingSpotIndx}));
    parkingBuildingSelectRef.current.value = 'placeholder';
    dispatch(updateCustomerParking({
      parkingBuilding: customerSelection,
      parkingSpot: `${parkingSpotIndx+1}`
    }));
  }
   return noAvailableSpots ?
    null
    :
    (<>
      <label htmlFor={selectId}>{selectLabel}{' '}</label>
      {!isLoading ?
        (<select
          name={selectId}
          id={selectId}
          onChange={onParkingStructureSelect}
          defaultValue={'placeholder'}
          ref={parkingBuildingSelectRef}
        >
          <option value="placeholder" disabled>{defaultOption}</option>
          {availableParkingBuildings()}
        </select>)
        :
        null
      }
    </>);
}

export default ParkingSelect;