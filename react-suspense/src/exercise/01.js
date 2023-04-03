// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import { PokemonDataView, fetchPokemon, PokemonErrorBoundary, PokemonInfoFallback } from '../pokemon'
import { createResource } from '../utils'

// function createResource(promise) {
//   let status = 'pending'
//   let result = promise.then(
//       resolved => {
//         result = resolved
//         status = 'resolved'
//       },
//       rejected => {
//         result = rejected
//         status = 'rejected'
//       }
//     )
//   return {read() {
//     if (status === 'pending') throw result
//     if (status === 'rejected') throw result
//     if (status === 'resolved') return result
//   }}
// }

const resource = createResource(fetchPokemon('pikachu'))
function PokemonInfo() {
  const pokemon = resource.read()
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <PokemonErrorBoundary>
          <React.Suspense fallback={<PokemonInfoFallback name={'Pikachu'} />}>
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
