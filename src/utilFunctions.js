function isSpotAvaibale(spot) {
  return spot === 0;
}

export function selectClosestAvailableParkingSpot(building, buildingNumber, parkingSpots) {
  //returns index of closest available spot
  const parkingRowToSearch = parseInt(buildingNumber) < 2 ? parkingSpots[building] : [...parkingSpots[building]].reverse();
  const indexOfAvailableSpot = parkingRowToSearch.findIndex(isSpotAvaibale);
  const closestParkingSpot = parseInt(buildingNumber) < 2 ? indexOfAvailableSpot : (parkingRowToSearch.length - 1) - indexOfAvailableSpot;
  return closestParkingSpot;
}