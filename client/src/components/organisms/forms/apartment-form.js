import React, {useState} from 'react'
import Form from '../../atoms/Form'
import {FormGroup} from '../../atoms/FormGroup'
import {Input} from '../../atoms/Input'
import {Button} from '../../atoms/Button'
import GoogleMap from '../GoogleMap'

function ApartmentForm({handleSubmit, action}) {
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')

  const changePosition = ({lng, lat}) => {
    setLongitude(lng.toFixed(5))
    setLatitude(lat.toFixed(5))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="name">Name</label>
        <Input id="name" type="text" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="description">Description</label>
        <Input id="description" type="text" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="price">Price</label>
        <Input id="price" type="number" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="size">Size</label>
        <Input id="size" type="number" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="rooms">Rooms</label>
        <Input id="rooms" type="number" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="longitude">Longitude</label>
        <Input
          id="longitude"
          value={longitude}
          onChange={({target}) => setLongitude(target.value)}
          type="number"
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="latitude">Latitude</label>
        <Input
          id="latitude"
          value={latitude}
          onChange={({target}) => setLatitude(target.value)}
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
        changeCoord={changePosition}
      />
    </Form>
  )
}

export default ApartmentForm
