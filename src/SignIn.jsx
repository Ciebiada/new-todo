import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { user } from './user'
import { PageContainer } from './PageContainer'
import { Button } from './Button'
import { Input } from './Input'
import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  margin: 20px;
  gap: 10px;
  ${(props) =>
    props.centered &&
    `
    text-align: center;
  `}
`

export const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  useEffect(() => {
    if (user.is) history.push('/')
  }, [])

  const changeUsername = ({ target: { value } }) => setUsername(value)
  const changePassword = ({ target: { value } }) => setPassword(value)

  const signIn = (e) => {
    e.preventDefault()
    user.auth(username, password, (ack) => {
      if (!ack.err) history.push('/')
    })
  }

  const signUp = () => {
    user.create(username, password, signIn)
  }

  return (
    <PageContainer>
      <form>
        <Row>
          <Input
            placeholder="Username"
            value={username}
            onChange={changeUsername}
          />
        </Row>
        <Row>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={changePassword}
          />
        </Row>
        <Row>
          <Button onClick={signIn} primary>
            Sign in
          </Button>
          <Button onClick={signUp}>Sign up</Button>
        </Row>
      </form>
    </PageContainer>
  )
}
