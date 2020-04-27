import React from "react"
import { Link } from "gatsby"
import { useAuth0 } from "../../utils/auth"
import css from "./index.module.css"

export const Navigation = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()
  return (
    <nav>
      {!isAuthenticated && (
        <button
          className={`${css.authButton} ${css["login"]}`}
          onClick={() =>
            loginWithRedirect({ appState: `${window.location.pathname}` })
          }
        >
          Log in
        </button>
      )}
      {isAuthenticated && (
        <>
          <button
            className={`${css.authButton} ${css["logout"]}`}
            onClick={() => logout()}
          >
            Log out
          </button>
          <Link className={css.account} to="/account">
            My Account
          </Link>
        </>
      )}
    </nav>
  )
}
