/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'

import {Link} from 'react-router-dom'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
import apartmentPlaceholderSvg from 'assets/apartment-rent-placeholder.svg'
import {useAuth} from '../../context/auth-context'
import {ActionButton} from '../atoms/Button'
import {useRemoveApartment} from '../../utils/apartments'
import {AiTwotoneEdit, FaMinusCircle} from 'react-icons/all'

function ApartmentRow({apartment}) {
  const {name, description, rooms, price, size} = apartment
  const [handleRemoveApartment] = useRemoveApartment()
  const {user} = useAuth()

  const isAdmin = user.role === 2
  const canChangeApartment = isAdmin || user._id === apartment.realtor

  const id = `apartment-row-${apartment._id}`

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
      }}
    >
      <Link
        aria-labelledby={id}
        to={`/apartments/${apartment._id}`}
        css={{
          minHeight: 270,
          flexGrow: 2,
          display: 'grid',
          gridTemplateColumns: '140px 1fr',
          gridGap: 20,
          border: `1px solid ${colors.gray20}`,
          color: colors.text,
          padding: '1.25em',
          borderRadius: '3px',
          ':hover,:focus': {
            textDecoration: 'none',
            boxShadow: '0 5px 15px -5px rgba(0,0,0,.08)',
            color: 'inherit',
          },
        }}
      >
        <div
          css={{
            width: 140,
            [mq.small]: {
              width: 100,
            },
          }}
        >
          <img
            alt={`${name} apartment cover`}
            css={{maxHeight: '100%', width: '100%'}}
            src={apartmentPlaceholderSvg}
          />
        </div>
        <div css={{flex: 1}}>
          <div css={{display: 'flex', justifyContent: 'space-between'}}>
            <div css={{flex: 1}}>
              <h2
                id={id}
                css={{
                  fontSize: '1.25em',
                  margin: '0',
                  color: colors.indigo,
                }}
              >
                {name}
              </h2>
            </div>
            <div css={{marginLeft: 10, flex: 1}}>
              <div
                css={{
                  marginTop: '0.4em',
                  fontStyle: 'italic',
                  fontSize: '1.8rem',
                }}
              >
                {description}
              </div>
              <br />
              <div
                css={{
                  fontSize: '1.6rem',
                }}
              >
                <p>Rooms: {rooms}</p>
                <p>Price: {price} $</p>
                <p>Size: {size} &#13217;</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
      {canChangeApartment && (
        <div
          css={{
            marginLeft: '20px',
            position: 'absolute',
            right: -20,
            color: colors.gray80,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '100%',
          }}
        >
          <Link to={`/apartments/edit/${apartment._id}`}>
            <ActionButton async={false} icon={<AiTwotoneEdit />} />
          </Link>
          <ActionButton
            async={true}
            icon={<FaMinusCircle />}
            onClick={() => handleRemoveApartment({_id: apartment._id})}
          />
        </div>
      )}
    </div>
  )
}

export {ApartmentRow}
