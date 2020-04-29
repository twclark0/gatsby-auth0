import authConfig from "./auth_config.json"
// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import "prismjs/themes/prism.css"

import React from "react"
import { Auth0Provider } from "./src/utils/auth"

const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}

export const wrapRootElement = ({ element }) => (
  <Auth0Provider
    domain={authConfig.domain}
    client_id={authConfig.clientId}
    audience={authConfig.audience}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    {element}
  </Auth0Provider>
)
