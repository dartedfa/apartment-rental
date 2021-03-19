import * as React from 'react'
import ApartmentList from '../organisms/apartment-list'

function ApartmentListScreen() {
  return (
    <ApartmentList
      filterApartments={ap => ap}
      noApartments={
        <p>
          Hey there! Welcome to Apartment rental. as it seems we can't find any
          apartments for you :(
        </p>
      }
      noFilteredApartments={
        <p>
          Looks like we can't find apartments with provided filters please try
          different filtering.
        </p>
      }
    />
  )
}

export default ApartmentListScreen
