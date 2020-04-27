import React from "react"
import { Link } from "gatsby"
import { useAuth0 } from "../../utils/auth"

export const Navigation = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()
  return (
    <nav>
      {!isAuthenticated && (
        <button
          onClick={() =>
            loginWithRedirect({ appState: `${window.location.pathname}` })
          }
        >
          Log in
        </button>
      )}
      {isAuthenticated && (
        <>
          <Link to="/account">My Account</Link>
          <button onClick={() => logout()}>Log out</button>
        </>
      )}
    </nav>
  )
}
