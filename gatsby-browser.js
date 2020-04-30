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

const Auth0Domain = process.env.AUTH0_DOMAIN
const Auth0ClientID = process.env.AUTH0_CLIENT_ID
const Auth0Audience = process.env.AUTH0_AUDIENCE
export const wrapRootElement = ({ element }) => (
  <Auth0Provider
    domain={Auth0Domain}
    client_id={Auth0ClientID}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    audience={Auth0Audience}
  >
    {element}
  </Auth0Provider>
)
