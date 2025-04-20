import React, {useState} from 'react'
import {moviesApi} from '../misc/MoviesApi'
import {getAvatarUrl, handleLogError} from '../misc/Helpers'
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Segment
} from 'semantic-ui-react'
import {useNavigate} from 'react-router-dom'
import {useKeycloak} from '@react-keycloak/web'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import Loader from "../loading/LoadingScreen";

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

  if (isLoading) return <Loader/>
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
          alt='user-avatar'
      />
  )

  return (
      <Container>
        <Grid centered>
          <Grid.Row>
            <Segment style={{ width: '330px' }}>
              <Form>
                <strong>Avatar</strong>
                <div style={{ height: 300 }}>
                  {avatarImage}
                </div>
                <Divider />
                <Button
                    fluid
                    onClick={handleSuffle}
                    color='blue'
                    disabled={imageLoading}
                >
                  Shuffle
                </Button>
                <Divider />
                <Button.Group fluid>
                  <Button onClick={handleCancel}>Cancel</Button>
                  <Button.Or />
                  <Button
                      disabled={originalAvatar === avatar || mutation.isPending}
                      onClick={handleSave}
                      positive
                  >
                    {mutation.isPending ? 'Saving...' : 'Save'}
                  </Button>
                </Button.Group>
              </Form>
            </Segment>
          </Grid.Row>
        </Grid>
      </Container>
  )
}

export default UserSettings
