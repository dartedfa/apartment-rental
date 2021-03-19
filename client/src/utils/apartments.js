import {useQuery} from 'react-query'
import {useClient} from 'context/auth-context'

// Initialize Loading apartments and loadingApartment

function useApartments(options = {}) {
  const client = useClient()

  const result = useQuery({
    queryKey: 'apartments',
    queryFn: () => client('apartments'),
    ...options,
  })
  return result
}

const bookQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
}

function useApartment(apartmentId) {
  const client = useClient()
  const {data} = useQuery({
    queryKey: ['apartments', {apartmentId}],
    queryFn: () =>
      client(`apartments/${apartmentId}`).then(({apartment, realtor}) => ({
        ...apartment,
        ...realtor,
      })),
    ...bookQueryConfig,
  })
  return data ?? {}
}

export {useApartments, useApartment}
