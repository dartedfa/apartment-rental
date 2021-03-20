/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'

import * as React from 'react'
import ApartmentList from '../organisms/apartment-list'
import {useAuth} from '../../context/auth-context'
import {Link} from '../atoms/link'

function ApartmentListScreen() {
  const {user} = useAuth()
  const isRealtor = user.role >= 1

  return (
    <>
      {isRealtor && <Link to="/apartments/new">Add new Apartment</Link>}
      <ApartmentList
        filterApartments={ap => ap}
        noApartments={
          <p>
            Hey there! Welcome to Apartment rental. as it seems we can't find
            any apartments for you :(
          </p>
        }
        noFilteredApartments={
          <p>
            Looks like we can't find apartments with provided filters please try
            different filtering.
          </p>
        }
      />
    </>
  )
}

export default ApartmentListScreen
