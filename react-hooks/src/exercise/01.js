// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import { useState } from 'react'

function Greeting({initialValue = ''}) {
  const [name, setName] = useState(initialValue)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input autoComplete='off' onChange={handleChange} id="name" value={name}/>
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialValue="Doug"/>
}

export default App
