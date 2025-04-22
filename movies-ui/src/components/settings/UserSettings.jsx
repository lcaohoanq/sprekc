import React, { useState } from 'react'
import { moviesApi } from '../misc/MoviesApi'
import { getAvatarUrl, handleLogError } from '../misc/Helpers'
import { useNavigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Loader from "../loading/LoadingScreen"

function UserSettings() {
  const navigate = useNavigate()
  const { keycloak } = useKeycloak()
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery(
      'userExtras',
      () => moviesApi.getUserExtrasMe(keycloak.token).then(res => res.data),
      {
        onError: handleLogError,
        enabled: !!keycloak.token,
      }
  )

  const [tempAvatar, setTempAvatar] = useState('')
  const [imageLoading, setImageLoading] = useState(false)

  const mutation = useMutation(
      (newAvatar) => moviesApi.saveUserExtrasMe(keycloak.token, { avatar: newAvatar }),
      {
        onSuccess: () => {
          queryClient.invalidateQueries('userExtras')
          keycloak['avatar'] = avatar
          navigate('/')
        },
        onError: handleLogError,
      }
  )

  if (isLoading) return <Loader />
  if (isError || !data) return <p>Error loading user data.</p>

  const { username, avatar: originalAvatar } = data
  const avatar = tempAvatar || originalAvatar

  const handleSuffle = () => {
    setImageLoading(true)
    const newAvatar = username + Math.floor(Math.random() * 1000) + 1
    setTempAvatar(newAvatar)
  }

  const handleCancel = () => {
    navigate("/")
  }

  const handleSave = () => {
    mutation.mutate(avatar)
  }

  const avatarImage = !avatar ? null : (
      <img
          src={getAvatarUrl(avatar)}
          onLoad={() => setImageLoading(false)}
          alt="user-avatar"
          className="w-full h-full object-cover rounded-full"
      />
  )

  return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center">
          <div className="w-80 p-6 bg-white shadow-md rounded-lg">
            <form>
              <strong>Avatar</strong>
              <div className="h-72 flex justify-center items-center">
                {avatarImage}
              </div>
              <hr className="my-4" />
              <button
                  type="button"
                  onClick={handleSuffle}
                  disabled={imageLoading}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
              >
                Shuffle
              </button>
              <hr className="my-4" />
              <div className="flex justify-between">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="w-1/3 py-2 bg-gray-300 text-white rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={originalAvatar === avatar || mutation.isPending}
                    className="w-1/3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300"
                >
                  {mutation.isPending ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default UserSettings
