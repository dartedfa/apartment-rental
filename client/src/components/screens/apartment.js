/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'

import {useParams} from 'react-router-dom'
import {useApartment} from 'utils/apartments'
import * as mq from 'styles/media-queries'
import apartmentPlaceholderSvg from 'assets/apartment-rent-placeholder.svg'
import {Link} from '../atoms/link'
import GoogleMap from '../organisms/GoogleMap'
import * as React from 'react'

function ApartmentScreen() {
  const {apartmentId} = useParams()
  const apartment = useApartment(apartmentId)

  const {
    name,
    description,
    firstName,
    lastName,
    email,
    rooms,
    size,
    price,
    updatedAt = '',
    longitude,
    latitude,
  } = apartment

  const date = updatedAt.split('T')[0]

  return (
    <div>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gridGap: '2em',
          marginBottom: '1em',
          [mq.small]: {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <img
          alt={`${name} apartment cover`}
          css={{width: '100%', maxWidth: '14rem'}}
          src={apartmentPlaceholderSvg}
        />
        <div>
          <div css={{display: 'flex', position: 'relative'}}>
            <div css={{flex: 1, justifyContent: 'space-between'}}>
              <h1>{name}</h1>
              <div css={{fontSize: '2rem'}}>{description}</div>
              <p>Rooms: {rooms}</p>
              <p>Price: {price} $</p>
              <p>Size: {size} &#13221;</p>
              <div>
                <i>{firstName + ' ' + lastName}</i>
                <span css={{marginRight: 6, marginLeft: 6}}>|</span>
                <Link to={`mailto:${email}`}>{email}</Link>{' '}
                {/*Implement mailto.*/}
              </div>
            </div>
          </div>
          <div css={{marginTop: 10, minHeight: 46}}>Created at: {date}</div>
          <br />
        </div>
      </div>
      <ApartmentMap latitude={latitude} longitude={longitude} />
    </div>
  )
}

function ApartmentMap({longitude, latitude}) {
  // TODO: Map implementation
  return <GoogleMap />
}

export default ApartmentScreen
