/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'
import ApartmentForm from '../organisms/forms/apartment-form'

function EditApartmentScreen() {
  return (
    <>
      <h1>Edit Apartment</h1>
      <ApartmentForm
        handleSubmit={event => console.log(event)}
        action="Edit Apartment"
      />
    </>
  )
}

export default EditApartmentScreen
