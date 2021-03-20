/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'
import ApartmentForm from '../organisms/forms/apartment-form'

function AddApartmentScreen() {
  return (
    <>
      <h1>Add Apartment</h1>
      <ApartmentForm
        handleSubmit={event => console.log(event)}
        action="Add Apartment"
      />
    </>
  )
}

export default AddApartmentScreen
