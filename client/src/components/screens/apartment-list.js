/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'

import * as React from 'react'
import ApartmentList from '../organisms/apartment-list'
import {useState} from 'react'
import Filters from '../organisms/filters'

function ApartmentListScreen() {
  const [state, setState] = useState({
    rooms: {min: '', max: ''},
    price: {min: '', max: ''},
    size: {min: '', max: ''},
  })
  const {rooms, price, size} = state

  const filterApartments = apartment => {
    if (rooms.min || rooms.max) {
      if (
        (rooms.min && apartment.rooms < rooms.min) ||
        (rooms.max && apartment.rooms > rooms.max)
      ) {
        return false
      }
    }

    if (price.min || price.max) {
      if (
        (price.min && apartment.price < price.min) ||
        (price.max && apartment.price > price.max)
      ) {
        return false
      }
    }

    if (size.min || size.max) {
      if (
        (size.min && apartment.size < size.min) ||
        (size.max && apartment.size > size.max)
      ) {
        return false
      }
    }

    return true
  }

  return (
    <>
      <Filters state={state} setState={setState} />
      <ApartmentList
        filterApartments={filterApartments}
        noApartments={
          <p>
            Hey there! Welcome to Apartment rental. as it seems we can't find
            any apartments for you :(
          </p>
        }
        noFilteredApartments={
          <p>
            Looks like we can't find apartments with provided filters please try
            different filtering.
          </p>
        }
      />
    </>
  )
}

export default ApartmentListScreen
