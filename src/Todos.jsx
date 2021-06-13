import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from './Button'
import { PageContainer } from './PageContainer'
import { Row } from './Row'
import { user } from './user'

export const Todos = () => {
  const [todos, setTodos] = useState({})
  const history = useHistory()

  useEffect(() => {
    if (!user.is) history.push('/sign-in')

    user
      .get('todos')
      .map()
      .on((todo, id) => {
        setTodos((todos) => ({ ...todos, [id]: todo }))
      })
  }, [])

  const addTodo = ({ target }) => {
    user.get('todos').set({ value: target.value })
    target.value = ''
  }

  const removeTodo = (id) => () => {
    user.get('todos').get(id).put(null)
  }

  const changeTodo =
    (id, todo) =>
    ({ target: { value } }) => {
      user
        .get('todos')
        .get(id)
        .put({ ...todo, value })
    }

  const signOut = () => {
    user.leave()
    history.push('/sign-in')
  }

  return (
    <PageContainer>
      <ul>
        {Object.entries(todos).map(
          ([id, todo]) =>
            todo && (
              <li key={id}>
                <input
                  value={todo.value}
                  onChange={changeTodo(id, todo)}
                ></input>{' '}
                <button onClick={removeTodo(id)}>x</button>
              </li>
            )
        )}
        <input onBlur={addTodo} placeholder="To-do"></input>
      </ul>
      <Row centered>
        <Button onClick={signOut}>Sign out</Button>
      </Row>
    </PageContainer>
  )
}
