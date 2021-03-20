import * as React from 'react'
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react'
import {useApartments} from '../../utils/apartments'
import {FullPageSpinner, Spinner} from '../atoms/Spinner'
import {useParams} from 'react-router-dom'
//import {history} from '../../context'
import {useState} from 'react'

const style = {
  width: '570px',
  height: '300px',
}

function GoogleMap({google}, ...params) {
  const {apartmentId} = useParams()
  const {data: apartments = [], isLoading} = useApartments()
  const [activeMarker, setActiveMarker] = useState()
  const [activeApartment, setActiveApartment] = useState()

  if (isLoading) {
    return <FullPageSpinner />
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
    : apartments

  const bounds = new google.maps.LatLngBounds()

  apartmentsToShow.forEach(el => {
    bounds.extend({
      lat: parseFloat(el.latitude),
      lng: parseFloat(el.longitude),
    })
  })

  return (
    <>
      <Map containerStyle={style} google={google} zoom={14} bounds={bounds}>
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
    </>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(GoogleMap)
