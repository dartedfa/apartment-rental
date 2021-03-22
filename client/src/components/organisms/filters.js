/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'

import * as React from 'react'
import {useAuth} from '../../context/auth-context'
import {FormGroup} from '../atoms/FormGroup'
import {Input} from '../atoms/Input'
import {Link} from '../atoms/link'

function Filters({state, setState}) {
  const {user} = useAuth()
  const canAddApartment = user.role >= 1
  const {size, price, rooms} = state
  return (
    <>
      <div>
        <div css={{width: 150}}>
          <h3>Filter by rooms</h3>
          <FormGroup>
            <label htmlFor="rooms-min">Min</label>
            <Input
              id="rooms-min"
              value={rooms.min}
              onChange={({target}) =>
                setState(prevState => ({
                  ...prevState,
                  rooms: {...rooms, min: target.value},
                }))
              }
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="rooms-max">Max</label>
            <Input
              id="rooms-max"
              value={rooms.max}
              onChange={({target}) =>
                setState(prevState => ({
                  ...prevState,
                  rooms: {...rooms, max: target.value},
                }))
              }
              type="number"
            />
          </FormGroup>
        </div>

        <div css={{width: 150}}>
          <h3>Filter by size</h3>
          <FormGroup>
            <label htmlFor="size-min">Min</label>
            <Input
              id="size-min"
              value={size.min}
              onChange={({target}) =>
                setState(prevState => ({
                  ...prevState,
                  size: {...size, min: target.value},
                }))
              }
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="size-max">Max</label>
            <Input
              id="size-max"
              value={size.max}
              onChange={({target}) =>
                setState(prevState => ({
                  ...prevState,
                  size: {...size, max: target.value},
                }))
              }
              type="number"
            />
          </FormGroup>
        </div>

        <div css={{width: 150}}>
          <h3>Filter by price</h3>
          <FormGroup>
            <label htmlFor="price-min">Min</label>
            <Input
              id="price-min"
              value={price.min}
              onChange={({target}) =>
                setState(prevState => ({
                  ...prevState,
                  price: {...price, min: target.value},
                }))
              }
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="price-max">Max</label>
            <Input
              id="price-max"
              value={price.max}
              onChange={({target}) =>
                setState(prevState => ({
                  ...prevState,
                  price: {...price, max: target.value},
                }))
              }
              type="number"
            />
          </FormGroup>
        </div>

        {canAddApartment && <Link to="/apartments/new">Add new Apartment</Link>}
      </div>
    </>
  )
}

export default Filters
