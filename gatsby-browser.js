// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import "prismjs/themes/prism.css"

import React from "react"
import { Auth0Provider } from "./src/utils/auth"
import { navigate } from "gatsby"

const onRedirectCallback = (appState) => {
  navigate(appState)
}

const Auth0Domain = process.env.AUTH0_DOMAIN || process.env.GATSBY_AUTH0_DOMAIN
const Auth0ClientID =
  process.env.AUTH0_CLIENT_ID || process.env.GATSBY_AUTH0_CLIENT_ID

export const wrapRootElement = ({ element }) => (
  <Auth0Provider
    domain={Auth0Domain}
    client_id={Auth0ClientID}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    {element}
  </Auth0Provider>
)
