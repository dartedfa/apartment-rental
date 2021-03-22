import {queryCache, useMutation, useQuery} from 'react-query'
import {useClient} from 'context/auth-context'

// Initialize Loading users and loadingUser

function useUsers(options = {}) {
  const client = useClient()

  const result = useQuery({
    queryKey: 'users',
    queryFn: () => client('users'),
    ...options,
  })
  return result
}

const bookQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
}

function useUser(userId) {
  const client = useClient()
  const response = useQuery({
    queryKey: ['users', {userId}],
    queryFn: () =>
      client(`users/${userId}`).then(({user}) => ({
        ...user,
      })),
    ...bookQueryConfig,
  })
  return response
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === 'function' ? recover() : null,
  onSettled: () => queryCache.invalidateQueries('users'),
}

function onUpdateMutation(newItem) {
  const previousItems = queryCache.getQueryData('users')

  queryCache.setQueryData('users', old => {
    return old.map(item => {
      return item._id === newItem._id ? {...item, ...newItem} : item
    })
  })

  return () => queryCache.setQueryData('users', previousItems)
}

function useUpdateUser(options) {
  const client = useClient()
  return useMutation(
    updates =>
      client(`users/${updates._id}`, {
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

function useCreateUser(options) {
  const client = useClient()

  return useMutation(data => client('users', {data}), {
    ...defaultMutationOptions,
    ...options,
  })
}

function useRemoveUser(options) {
  const client = useClient()

  return useMutation(({_id}) => client(`users/${_id}`, {method: 'DELETE'}), {
    onMutate: removedItem => {
      const previousItems = queryCache.getQueryData('users')

      queryCache.setQueryData('users', old => {
        return old.filter(item => item._id !== removedItem._id)
      })

      return () => queryCache.setQueryData('users', previousItems)
    },
    ...defaultMutationOptions,
    ...options,
  })
}

export {useUsers, useUser, useUpdateUser, useRemoveUser, useCreateUser}