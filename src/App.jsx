import { useState } from 'react'
import Login from './components/Login.jsx'
import Success from './components/Success.jsx'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return loggedIn ? (
    <Success onBack={() => setLoggedIn(false)} />
  ) : (
    <Login onSuccess={() => setLoggedIn(true)} />
  )
}
