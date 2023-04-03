// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import { renderHook, act } from '@testing-library/react-hooks'

// function TestComponent() {
//   const {count, increment, decrement} = useCounter()
//   return (
//     <div>
//       <div>Count value: {count}</div>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//     </div>
//   )
// }

// test('exposes the count and increment/decrement functions', () => {
//   render(<TestComponent />)

//   const increment = screen.getByRole('button', {name: /increment/i})
//   const decrement = screen.getByRole('button', {name: /decrement/i})
//   const message = screen.getByText(/count value/i)

//   expect(message).toHaveTextContent('count: 0')
//   userEvent.click(increment)
//   expect(message).toHaveTextContent('count: 1')
//   userEvent.click(decrement)
//   expect(message).toHaveTextContent('count: 0')

// })

function setup(props) {
  const results = {}
  function TestComponent() {
    Object.assign(results, useCounter(props))
    return null
  }
  render(<TestComponent />)
  return results
}


test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(useCounter)

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const {result} = renderHook(() => useCounter({initialCount: 4}))

  expect(result.current.count).toBe(4)
  act(() => result.current.increment())
  expect(result.current.count).toBe(5)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(4)
})

test('allows customization of the initial step', () => {
  const {result} = renderHook(() => useCounter({step: 10}))

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(10)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})
/* eslint no-unused-vars:0 */
