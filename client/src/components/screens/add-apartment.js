/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'
import ApartmentForm from '../organisms/forms/apartment-form'
import {useCreateApartment} from '../../utils/apartments'
import {useNavigate} from 'react-router'

const testData = {
  name: 'David',
  description: 'test description with Sea view.',
  size: 80,
  price: 5000,
  rooms: 11,
  longitude: '44.7048628',
  latitude: '41.7221374',
}

function AddApartmentScreen() {
  const [handleSubmitCreation] = useCreateApartment({throwOnError: true})
  const navigate = useNavigate()
  return (
    <>
      <h1>Add Apartment</h1>
      <ApartmentForm
        handleSubmit={data => {
          handleSubmitCreation(data)
          navigate('/')
        }}
        action="Add Apartment"
      />
    </>
  )
}

export default AddApartmentScreen
