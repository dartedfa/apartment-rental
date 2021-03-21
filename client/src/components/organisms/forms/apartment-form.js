/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'

import React, {useState} from 'react'
import Form from '../../atoms/Form'
import {FormGroup} from '../../atoms/FormGroup'
import {Input} from '../../atoms/Input'
import {Button} from '../../atoms/Button'
import GoogleMap from '../GoogleMap'

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
  } = state

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
    handleSubmit(state)
  }

  return (
    <Form fullScreen={true} onSubmit={handleValidateBeforeSubmit}>
      <FormGroup
        css={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <label css={{marginRight: 15}} htmlFor="isAvailable">
          Rented
        </label>
        <Input
          id="isAvailable"
          type="checkbox"
          css={{marginTop: 4}}
          checked={isAvailable}
          onChange={setSingleState}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="name">Name</label>
        <Input id="name" type="text" value={name} onChange={setSingleState} />
      </FormGroup>
      <FormGroup>
        <label htmlFor="description">Description</label>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={setSingleState}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="price">Price</label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={setSingleState}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="size">Size</label>
        <Input id="size" type="number" value={size} onChange={setSingleState} />
      </FormGroup>
      <FormGroup>
        <label htmlFor="rooms">Rooms</label>
        <Input
          id="rooms"
          type="number"
          value={rooms}
          onChange={setSingleState}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="longitude">Longitude</label>
        <Input
          id="longitude"
          value={longitude}
          onChange={setSingleState}
          type="number"
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="latitude">Latitude</label>
        <Input
          id="latitude"
          value={latitude}
          onChange={setSingleState}
          type="number"
        />
      </FormGroup>
      <div>
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
