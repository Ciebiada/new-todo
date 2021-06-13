import Gun from 'gun/gun'
import 'gun/sea'

const gun = Gun([
  'http://localhost:8765/gun',
  'https://mvp-gun.herokuapp.com/gun',
])
// const gun = Gun(['http://localhost:8765/gun'])

export const user = gun.user().recall({ sessionStorage: true })
