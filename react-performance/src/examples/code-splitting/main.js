// http://localhost:3000/isolated/examples/code-splitting/main.js

import * as React from 'react'

const DepsIncluded = React.lazy(() =>
  import(/* webpackChunkName: "deps" */ './deps-included'),
)
const One = React.lazy(() =>
  import(/* webpackChunkName: "group" */ './group/one'),
)
const Two = React.lazy(() =>
  import(/* webpackChunkName: "group" */ './group/two'),
)

const Prefetched = React.lazy(() =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "prefetched" */
    './prefetched'
  ),
)
const Preloaded = React.lazy(() =>
  import(
    /* webpackPreload: true */
    /* webpackChunkName: "preload" */
    './preloaded'
  ),
)

function Main() {
  const [show, setShow] = React.useState(false)
  return (
    <>
    <button onClick={() => setShow(true)}>Show</button>
      {show ? (
        <div>
          <React.Suspense fallback="...DepsIncluded...">
            <DepsIncluded />
          </React.Suspense>
          <br/>
          <React.Suspense fallback="...Group...">
            <One />
            <Two />
          </React.Suspense>
          <br/>
          <React.Suspense fallback="...Prefetched...">
            <Prefetched />
          </React.Suspense>
          <br/>
          <React.Suspense fallback="...Preloaded...">   
            <Preloaded />
          </React.Suspense>
        </div>
      ) : null}
    </>
  )
}

export default Main
