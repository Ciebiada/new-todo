import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { user } from './user'
import { PageContainer } from './PageContainer'
import { Button } from './Button'
import { Input } from './Input'
import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Panel = styled.div`
  width: 100%;
  max-width: 400px;
  /* background: #222;
  border-radius: 10px; */
`

const Row = styled.div`
  margin: 20px;
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
    <Container>
      <Panel>
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
          <Row centered>
            <Button onClick={signIn} primary>
              Sign in
            </Button>
          </Row>
          <Row centered>
            <Button onClick={signUp}>Sign up</Button>
          </Row>
        </form>
      </Panel>
    </Container>
  )
}
