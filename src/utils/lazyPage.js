/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
import React from "react"
import Loadable from "react-loadable"

function Loading(props) {
  if (props.error) {
    return (
      <div>
        Error!
        <button onClick={props.retry}>Retry</button>
      </div>
    )
  }
  if (props.pastDelay) {
    return <div>Loading...</div>
  }
  return null
}

export const Discover = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'discover',  webpackPrefetch:true  */ "../client/pages/Discover/Discover.jsx"
    ),
  loading: Loading,
  delay: 300,
})
