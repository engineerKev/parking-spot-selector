import React, { useCallback, useRef, Fragment} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateParkingStructure, resetParkingStructure } from '../features/parkingSlots/parkingSpotsSlice';
import { updateIsLoading } from '../features/loading/loadingSlice';
import { updateCustomerParking} from '../features/customerParking/customerParkingSlice';
import { selectClosestAvailableParkingSpot } from '../utilFunctions';


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
    <button onClick={() => dispatch(resetParkingStructure())}>check for new open spaces</button>
    :
    (<>
      {!isLoading ?
      (
        <>
          <label htmlFor={selectId}>{`${selectLabel} `}</label>
          <select
            name={selectId}
            id={selectId}
            onChange={onParkingStructureSelect}
            defaultValue={'placeholder'}
            ref={parkingBuildingSelectRef}
          >
            <option value="placeholder" disabled>{defaultOption}</option>
            {availableParkingBuildings()}
          </select>
        </>
      )
        :
        null
      }
     </>
    );
}

export default ParkingSelect;