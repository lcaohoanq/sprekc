import { config } from '@/Constants.js'

export const getAvatarUrl = (text) => {
  return `${config.url.AVATARS_DICEBEAR_URL}/avataaars/svg?seed=${text}`
}

export const isAdmin = (keycloak) => {
  return keycloak?.tokenParsed?.resource_access?.['movies-app']?.roles?.includes('MOVIES_ADMIN') ?? false
}

export const handleLogError = (error) => {
  if (error.response) {
    console.log(error.response.data)
  } else if (error.request) {
    console.log(error.request)
  } else {
    console.log(error.message)
  }
}
