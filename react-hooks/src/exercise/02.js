// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

const useLocalStorageState = (
  key, 
  defaultValue, 
  {serialize = JSON.stringify, deserialize = JSON.parse} = {}
) => {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = deserialize(localStorage.getItem(key))
    if(valueInLocalStorage) 
      return valueInLocalStorage 
    return (typeof defaultValue === 'function' ? defaultValue() : defaultValue)
  })

  const prevKeyRef = useRef(key)
  
  useEffect(() => {
    const prevKey = prevKeyRef.current
    if(prevKey !== key) {
      localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key 
    localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])
  
  return [state, setState]
} 

function Greeting({initialName = ''}) {
  console.log(initialName)
  const [state, setState] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setState(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={state} onChange={handleChange} id="name" />
      </form>
      {state ? <strong>Hello {state}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Naruto" />
}

export default App
