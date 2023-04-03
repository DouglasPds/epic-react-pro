// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function UsernameForm({onSubmitUsername}) {
  // 🐨 add a submit event handler here (`handleSubmit`).
  // 💰 Make sure to accept the `event` as an argument and call
  // `event.preventDefault()` to prevent the default behavior of form submit
  // events (which refreshes the page).
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  //
  // 🐨 get the value from the username input (using whichever method
  // you prefer from the options mentioned in the instructions)
  // 💰 For example: event.target.elements[0].value
  // 🐨 Call `onSubmitUsername` with the value of the input

  // 🐨 add the onSubmit handler to the <form> below

  // 🐨 make sure to associate the label to the input.
  // to do so, set the value of 'htmlFor' prop of the label to the id of input
  
  const inputRef = React.useRef();
  const [error, setError] = React.useState(false);
  const [username, setUsername] = React.useState('');
  
  function handleSubmit(e) {
    e.preventDefault();
    //Extra credit 1
    //const value = inputRef.current.value;
    // const {value} = e.target.elements.username;
    onSubmitUsername(username);
  }

  //Extra credit 2
  // function handleChange(event) {
  //   const valueInput = event.target.value;
  //   const isValid = valueInput === valueInput.toLowerCase();
  //   setError(isValid ? false : true);
  // }
  
  function handleLowerCase(event) {
    setUsername(event.target.value.toLowerCase());
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input value={username} onChange={handleLowerCase} ref={inputRef} type="text" id="username"/>
        {/* {error && <span role="alert">Username must be lower case</span>} */}
      </div>
      <button disabled={error} type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
