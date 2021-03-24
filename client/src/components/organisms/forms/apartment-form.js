/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'

import React, {useState} from 'react'
import Form from '../../atoms/Form'
import {FormGroup} from '../../atoms/FormGroup'
import {Input} from '../../atoms/Input'
import {Button} from '../../atoms/Button'
import GoogleMap from '../GoogleMap'
import {useAuth} from '../../../context/auth-context'
import {useUsers} from '../../../utils/users'
import * as colors from '../../../styles/colors'
import {Spinner} from '../../atoms/Spinner'

function RealtorsInput({setSingleState, realtor}) {
  const {data: users = [], isLoading} = useUsers()

  if (isLoading) {
    return <Spinner />
  }

  return (
    <FormGroup inLine={true}>
      <label htmlFor="realtors">Realtors</label>
      <select id="realtor" onChange={setSingleState} value={realtor}>
        <option value="">Select Realtor</option>
        {users.map(user => {
          if (user.role !== 1) {
            return false
          }

          return (
            <option key={user._id} value={user._id}>
              {user.firstName} {user.lastName} {user.email}
            </option>
          )
        })}
      </select>
    </FormGroup>
  )
}

function ApartmentForm({handleSubmit, action, apartment}) {
  const [state, setState] = useState({
    _id: apartment?._id,
    name: apartment?.name || '',
    description: apartment?.description || '',
    size: apartment?.size || '',
    rooms: apartment?.rooms || '',
    price: apartment?.price || '',
    isAvailable: apartment?.isAvailable || false,
    longitude: apartment?.longitude || '',
    latitude: apartment?.latitude || '',
    realtor: apartment?.realtor || '',
  })

  const {
    name,
    description,
    size,
    rooms,
    price,
    longitude,
    latitude,
    isAvailable,
    realtor,
  } = state

  const {user} = useAuth()
  const isAdmin = user.role === 2
  const isRealtor = user.role === 1

  const changePosition = ({lng, lat}) => {
    setState(prevState => ({
      ...prevState,
      longitude: lng.toFixed(5),
      latitude: lat.toFixed(5),
    }))
  }

  const setSingleState = ({target}) => {
    setState(prevState => ({
      ...prevState,
      [target.id]: target.type === 'checkbox' ? target.checked : target.value,
    }))
  }

  const handleValidateBeforeSubmit = event => {
    event.preventDefault()
    handleSubmit({...state, realtor: isRealtor ? user._id : realtor})
  }

  return (
    <Form
      fullScreen={true}
      onSubmit={handleValidateBeforeSubmit}
      css={{backgroundColor: colors.base, border: `1px solid ${colors.gray}`}}
    >
      <FormGroup
        css={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <label css={{marginRight: 15}} htmlFor="isAvailable">
          Available
        </label>
        <Input
          id="isAvailable"
          type="checkbox"
          css={{marginTop: 4}}
          checked={isAvailable}
          onChange={setSingleState}
        />
      </FormGroup>
      <FormGroup inLine={true}>
        <label htmlFor="name">Name</label>
        <Input id="name" type="text" value={name} onChange={setSingleState} />
      </FormGroup>
      <FormGroup inLine={true}>
        <label htmlFor="description">Description</label>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={setSingleState}
        />
      </FormGroup>
      <FormGroup inLine={true}>
        <label htmlFor="price">Price</label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={setSingleState}
        />
      </FormGroup>
      <FormGroup inLine={true}>
        <label htmlFor="size">Size</label>
        <Input id="size" type="number" value={size} onChange={setSingleState} />
      </FormGroup>
      <FormGroup inLine={true}>
        <label htmlFor="rooms">Rooms</label>
        <Input
          id="rooms"
          type="number"
          value={rooms}
          onChange={setSingleState}
        />
      </FormGroup>
      <FormGroup inLine={true}>
        <label htmlFor="longitude">Longitude</label>
        <Input
          id="longitude"
          value={longitude}
          onChange={setSingleState}
          type="number"
        />
      </FormGroup>
      <FormGroup inLine={true}>
        <label htmlFor="latitude">Latitude</label>
        <Input
          id="latitude"
          value={latitude}
          onChange={setSingleState}
          type="number"
        />
      </FormGroup>
      {isAdmin && (
        <RealtorsInput setSingleState={setSingleState} realtor={realtor} />
      )}
      <div css={{textAlign: 'right'}}>
        <Button type="submit" variant="secondary">
          {action}
        </Button>
      </div>
      <GoogleMap
        data={{lat: latitude, lng: longitude}}
        changeCoordinate={changePosition}
      />
    </Form>
  )
}

export default ApartmentForm
