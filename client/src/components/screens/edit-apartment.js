/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'
// import * as React from 'react'
import ApartmentForm from '../organisms/forms/apartment-form'
import {useApartment, useUpdateApartment} from '../../utils/apartments'
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router'
import {FullPageSpinner} from '../atoms/Spinner'

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
          console.log(data)
          handleSubmitUpdate(data)
          navigate('/')
        }}
        action="Edit Apartment"
      />
    </>
  )
}

export default EditApartmentScreen
