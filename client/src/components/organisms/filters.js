/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'

import * as React from 'react'
import {useAuth} from '../../context/auth-context'
import {FormGroup} from '../atoms/FormGroup'
import {Input} from '../atoms/Input'
import {gray10, orange} from '../../styles/colors'
import {AddButton} from '../atoms/Button'
import {useNavigate} from 'react-router'

function Filters({state, setState}) {
  const {user} = useAuth()
  const canAddApartment = user.role >= 1
  const {size, price, rooms} = state
  const navigate = useNavigate()
  return (
    <>
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          border: '1px solid #e4e5e9',
          padding: 10,
          marginBottom: 20,
          backgroundColor: orange,
          fontSize: '1.3rem',
        }}
      >
        <div css={{width: '30%'}}>
          <h3 css={{color: gray10}}>Filter by rooms</h3>
          <FormGroup>
            <label htmlFor="rooms-min" css={{color: 'white'}}>
              Min
            </label>
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
            <label htmlFor="rooms-max" css={{color: 'white'}}>
              Max
            </label>
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

        <div css={{width: '30%'}}>
          <h3 css={{color: gray10}}>Filter by size</h3>
          <FormGroup>
            <label htmlFor="size-min" css={{color: 'white'}}>
              Min
            </label>
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
            <label htmlFor="size-max" css={{color: 'white'}}>
              Max
            </label>
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

        <div css={{width: '30%'}}>
          <h3 css={{color: gray10}}>Filter by price</h3>
          <FormGroup>
            <label htmlFor="price-min" css={{color: 'white'}}>
              Min
            </label>
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
            <label htmlFor="price-max" css={{color: 'white'}}>
              Max
            </label>
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
      </div>
      {canAddApartment && (
        <AddButton
          onClick={e => {
            navigate('/apartments/new')
          }}
        >
          Add new Apartment
        </AddButton>
      )}
    </>
  )
}

export default Filters
