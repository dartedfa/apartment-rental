/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'
import ApartmentForm from '../organisms/forms/apartment-form'
import {
  useApartment,
  useRemoveApartment,
  useUpdateApartment,
} from '../../utils/apartments'
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router'
import {FullPageSpinner} from '../atoms/Spinner'
import {ActionButton} from '../atoms/Button'
import {FaMinusCircle} from 'react-icons/all'

const testData = {
  _id: '60563bfa45d46a811070d36a',
  description: 'Test it updates !',
  price: 100,
  longitude: '44.7048628',
  latitude: '41.7221374',
}

function EditApartmentScreen() {
  const navigate = useNavigate()
  const {apartmentId} = useParams()

  const {data: apartment = {}, isLoading, error} = useApartment(apartmentId)
  const [handleSubmitUpdate] = useUpdateApartment({throwOnError: true})

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <>
      <h1>Edit Apartment</h1>
      <ApartmentForm
        apartment={apartment}
        handleSubmit={data => {
          handleSubmitUpdate(data)
          navigate('/')
        }}
        action="Edit Apartment"
      />
    </>
  )
}

export default EditApartmentScreen
