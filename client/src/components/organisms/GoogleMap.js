/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'

import * as React from 'react'

import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react'
import {useApartments} from '../../utils/apartments'
import {FullPageSpinner, Spinner} from '../atoms/Spinner'
import {useParams} from 'react-router-dom'
//import {history} from '../../context'
import {useState} from 'react'

const style = {
  minWidth: 270,
  height: 300,
}

function GoogleMap({google, data, changeCoord}) {
  const {apartmentId} = useParams()
  const {data: apartments = [], isLoading} = useApartments()
  const [activeMarker, setActiveMarker] = useState()
  const [activeApartment, setActiveApartment] = useState()

  if (isLoading) {
    return (
      <div css={{width: '100%', margin: 'auto'}}>
        <Spinner />
      </div>
    )
  }

  const showHouseDetails = (props, marker, e) => {
    // if (!apartmentId) {
    //   history.push(`/apartments/${props.id}`)
    // }
    setActiveApartment(props.elem)
    setActiveMarker(marker)
  }

  const apartmentsToShow = apartmentId
    ? apartments.filter(el => {
        return el._id === apartmentId
      })
    : data === undefined
    ? apartments
    : []

  const bounds = new google.maps.LatLngBounds()

  apartmentsToShow.forEach(el => {
    bounds.extend({
      lat: parseFloat(el.latitude),
      lng: parseFloat(el.longitude),
    })
  })
  if (data !== undefined) {
    if (
      Number.isInteger(parseInt(data.lat, 10)) &&
      Number.isInteger(parseInt(data.lng, 10))
    ) {
      apartmentsToShow.push({
        id: 'newData',
        latitude: data.lat,
        longitude: data.lng,
        ...data,
      })
      bounds.extend({
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lng),
      })
    }
  }

  const onMapClick = (props, marker, e) => {
    if (data !== undefined) {
      changeCoord({lat: e.latLng.lat(), lng: e.latLng.lng()})
      //console.log(props.initialCenter)
    }
  }

  //console.log(apartmentsToShow)

  return (
    <div css={{position: 'relative'}}>
      <Map
        containerStyle={style}
        google={google}
        bounds={bounds}
        zoom={14}
        onClick={onMapClick}
      >
        {apartmentsToShow.map(el => {
          return (
            <Marker
              key={el._id}
              id={el._id}
              position={{lat: el.latitude, lng: el.longitude}}
              name={el.name}
              title={el.name}
              elem={el}
              onClick={showHouseDetails}
            />
          )
        })}
        <InfoWindow visible={true} marker={activeMarker}>
          <div>
            <h1>{!!activeApartment && activeApartment.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(GoogleMap)
