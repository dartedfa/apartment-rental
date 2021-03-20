import {queryCache, useMutation, useQuery} from 'react-query'
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
  const response = useQuery({
    queryKey: ['apartments', {apartmentId}],
    queryFn: () =>
      client(`apartments/${apartmentId}`).then(({apartment, realtor}) => ({
        ...apartment,
        ...realtor,
      })),
    ...bookQueryConfig,
  })
  return response
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === 'function' ? recover() : null,
  onSettled: () => queryCache.invalidateQueries('apartments'),
}

function onUpdateMutation(newItem) {
  const previousItems = queryCache.getQueryData('apartments')

  queryCache.setQueryData('apartments', old => {
    return old.map(item => {
      return item._id === newItem._id ? {...item, ...newItem} : item
    })
  })

  return () => queryCache.setQueryData('apartments', previousItems)
}

function useUpdateApartment(options) {
  const client = useClient()

  return useMutation(
    updates =>
      client(`apartments/${updates._id}`, {
        method: 'PATCH',
        data: updates,
      }),
    {
      onMutate: onUpdateMutation,
      ...defaultMutationOptions,
      ...options,
    },
  )
}

function useCreateApartment(options) {
  const client = useClient()

  return useMutation(data => client('apartments', {data}), {
    ...defaultMutationOptions,
    ...options,
  })
}

function useRemoveApartment(options) {
  const client = useClient()

  return useMutation(
    ({_id}) => client(`apartments/${_id}`, {method: 'DELETE'}),
    {
      onMutate: removedItem => {
        const previousItems = queryCache.getQueryData('apartments')

        queryCache.setQueryData('apartments', old => {
          return old.filter(item => item._id !== removedItem._id)
        })

        return () => queryCache.setQueryData('apartments', previousItems)
      },
      ...defaultMutationOptions,
      ...options,
    },
  )
}

export {
  useApartments,
  useApartment,
  useUpdateApartment,
  useRemoveApartment,
  useCreateApartment,
}
