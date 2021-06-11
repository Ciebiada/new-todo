import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { user } from './user'

export const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const changeUsername = ({ target: { value } }) => setUsername(value)
  const changePassword = ({ target: { value } }) => setPassword(value)

  const signIn = () => {
    user.auth(username, password, (ack) => {
      if (!ack.err) history.push('/')
    })
  }

  const signUp = () => {
    user.create(username, password, signIn)
  }

  return (
    <div>
      <input
        placeholder="username"
        value={username}
        onChange={changeUsername}
      />
      <input
        placeholder="password"
        value={password}
        onChange={changePassword}
      />
      <button onClick={signIn}>sign in</button>
      <button onClick={signUp}>sign up</button>
    </div>
  )
}
