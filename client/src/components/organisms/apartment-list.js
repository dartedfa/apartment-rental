/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'

import {useApartments} from '../../utils/apartments'
import {Spinner} from '../atoms/Spinner'
import {ApartmentListUL} from '../atoms/apartment-list'
import {ApartmentRow} from '../molecules/apartment-row'

function ApartmentList({filterApartments, noApartments, noFilteredApartments}) {
  const {data: apartments = [], isLoading} = useApartments()

  const filteredApartments = apartments.filter(filterApartments)

  if (isLoading) {
    return (
      <div css={{width: '100%', margin: 'auto'}}>
        <Spinner />
      </div>
    )
  }

  if (!apartments.length) {
    return <div css={{marginTop: '1em', fontSize: '1.2em'}}>{noApartments}</div>
  }

  if (!filteredApartments.length) {
    return (
      <div css={{marginTop: '1em', fontSize: '1.2em'}}>
        {filteredApartments}
      </div>
    )
  }

  return (
    <>
      <ApartmentListUL>
        {filteredApartments.map(apartment => (
          <li key={apartment._id} aria-label={apartment.name}>
            <ApartmentRow apartment={apartment} />
          </li>
        ))}
      </ApartmentListUL>
      {/* TODO: Map Goes here*/}
    </>
  )
}

export default ApartmentList
