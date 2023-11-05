import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

function AuthRouthe ({ children }) {
  const isToken = getToken()
  console.log(isToken)
  if (isToken) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace={true} />

  }
}

export { AuthRouthe }