import React from 'react';
import { useSelector } from 'react-redux';
import ParkingSelect from './components/ParkingSelect'
import ParkingInstructions from './components/ParkingInstructions'
import './App.css';

function App() {
  const { parkingBuilding, parkingSpot } = useSelector((store) =>  store.customerParking);
  const noAvailableSpots = useSelector((store) =>  store.parkingStructure.noAvailableSpots);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Alphabet Parking</h1>
      </header>
      <section className='strcuture-selection'>
        {
          (parkingBuilding.length && parkingSpot.length) 
          ?
          <ParkingInstructions />
          :
          <>
            <p>
              {noAvailableSpots ? 'Sorry the parking structure is full' : 'Please select a structure to park in.'}
            </p>
            <ParkingSelect 
              selectId='parking-structures'
              selectLabel='Available parking structures'
              defaultOption='Parking Buildings'
            />
          </>
        }
      </section>
    </div>
  );
}

export default App;
