import * as React from 'react'
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react'
import {useApartments} from '../../utils/apartments'
import {Spinner} from '../atoms/Spinner'
import {useParams} from 'react-router-dom'
import {history} from '../../context'

const style = {
  width: '570px',
  height: '300px',
}

function GoogleMap({google}, ...params) {
  const {apartmentId} = useParams()
  const {data: apartments = [], isLoading} = useApartments()

  if (isLoading) {
    return (
      <div css={{width: '100%', margin: 'auto'}}>
        <Spinner />
      </div>
    )
  }

  const showHouseDetails = (props, marker, e) => {
    if (!apartmentId) {
      history.push(`/apartments/${props.id}`)
    }
  }

  const apartmentsToShow = apartmentId
    ? apartments.filter(el => {
        return el._id === apartmentId
      })
    : apartments

  return (
    <>
      <Map
        containerStyle={style}
        google={google}
        zoom={14}
        initialCenter={{
          lat: 41.7221374,
          lng: 44.7048628,
        }}
      >
        {apartmentsToShow.map(el => {
          return (
            <Marker
              key={el._id}
              id={el._id}
              position={{lat: el.latitude, lng: el.longitude}}
              name={el.name}
              title={el.name}
              onClick={showHouseDetails}
            />
          )
        })}
      </Map>
    </>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(GoogleMap)
