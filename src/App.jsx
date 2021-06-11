import React, { useEffect, useState } from 'react'
import Gun from 'gun/gun'

const db = Gun(['http://localhost:8765/gun', 'https://mvp-gun.herokuapp.com/gun', 'https://e2eec.herokuapp.com/gun']).get('new-todo').get('todos')

export const App = () => {
  const [todos, setTodos] = useState({})

  useEffect(() => {
    db.map().on((todo, id) => {
      setTodos((todos) => ({ ...todos, [id]: todo }))
    })
  }, [])

  const addTodo = ({ target }) => {
    db.set({ value: target.value })
    target.value = ''
  }

  const removeTodo = (id) => () => {
    db.get(id).put(null)
  }

  const changeTodo =
    (id, todo) =>
    ({ target: { value } }) => {
      db.get(id).put({ ...todo, value })
    }

  return (
    <ul>
      {Object.entries(todos).map(
        ([id, todo]) =>
          todo && (
            <li key={id}>
              <input value={todo.value} onChange={changeTodo(id, todo)}></input>{' '}
              <button onClick={removeTodo(id)}>x</button>
            </li>
          )
      )}
      <input onBlur={addTodo}></input>
    </ul>
  )
}
