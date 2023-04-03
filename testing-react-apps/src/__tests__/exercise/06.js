// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'

jest.mock('react-use-geolocation')

// beforeAll(() => {
//   window.navigator.geolocation = {
//     getCurrentPosition: jest.fn()
//   }
// })

// function deferred() {
//   let resolve, reject
//   const promise = new Promise((res, rej) => {
//     resolve = res
//     reject = rej
//   })
//   return {promise, resolve, reject}
// }

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude:2,
      longitude:2 
    }
  }

  let setPosition
  useCurrentPosition.mockImplementation(() => {
    const [state, setState] = React.useState()
    setPosition = setState
    return [state]
  })

  // const {promise, resolve} = deferred()
  // navigator.geolocation.getCurrentPosition.mockImplementation(callback => {
  //   promise.then(() => callback(fakePosition))
  // })

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  // await act(async () => await resolve())
  act(() => {setPosition(fakePosition)})

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)
  expect(screen.getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)
})

/*
eslint
  no-unused-vars: "off",
*/
